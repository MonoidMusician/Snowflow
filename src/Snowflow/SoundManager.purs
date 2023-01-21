module Snowflow.SoundManager where

import Prelude

import Bolson.Control (switcher)
import Control.Alt ((<|>))
import Control.Alternative (empty, guard)
import Control.Apply (lift2)
import Data.Foldable (oneOf, traverse_)
import Data.HeytingAlgebra (ff, implies, tt)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..), isJust, maybe)
import Data.Monoid.Disj (Disj(..))
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.Profunctor (class Profunctor, dimap, lcmap)
import Data.Set as Set
import Data.Tuple (Tuple(..))
import Data.Variant (Variant, inj)
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Effect.Exception (throw)
import Effect.Ref (Ref)
import Effect.Ref as Ref
import Effect.Unsafe (unsafePerformEffect)
import FRP.Behavior (Behavior)
import FRP.Behavior as Behavior
import FRP.Event (class Filterable, Event, create, filterMap, mapAccum, sampleOnRight, withLast)
import FRP.Event as Event
import FRP.Event.AnimationFrame (animationFrame)
import Ocarina.Control as Oc
import Ocarina.Core (Audible, AudioOnOff, apOff, apOn, dt)
import Ocarina.Core as OC
import Ocarina.Core as Ocarina
import Ocarina.Interpret (decodeAudioDataFromUri)
import Ocarina.Interpret as OI
import Ocarina.WebAPI (AudioContext, BrowserAudioBuffer)
import Type.Proxy (Proxy(..))

-- | `IOValue i o` represents a realtime-varying value taking values in `i` and
-- | transforming them to `o`. Most commonly this is a discrete mutable cell
-- | backed by a `Ref` with `i = o` (i.e., it is a `DValue` short for Dynamic
-- | Value). It can also representing continuous state, such as notions of time
-- | (realtime or audio-context time), where the `event` is a discrete sampling
-- | of `behavior` (such as by `animationFrame`), since it does not make sense
-- | to ask when time itself changes.
newtype IOValue i o = IOValue
  { push :: i -> Effect Unit
  , pull :: Effect o
  , event :: Event o
  , behavior :: Behavior o
  }
instance Profunctor IOValue where
  dimap f g (IOValue r) = IOValue
    { push: r.push <<< f
    , pull: map g r.pull
    , event: map g r.event
    , behavior: map g r.behavior
    }
instance Functor (IOValue i) where
  map = dimap identity
instance Apply OValue where
  apply (IOValue r1) (IOValue r2) = IOValue
    { push: absurd
    , pull: r1.pull <*> r2.pull
    , event:
        filterMap (\(Tuple (Disj b) v) -> v <$ guard b) $
          lift2 apply
            do map pure (unsafeBang r1.pull) <|> map (Tuple (Disj true)) r1.event
            do map pure (unsafeBang r2.pull) <|> map (Tuple (Disj true)) r2.event
    , behavior: r1.behavior <*> r2.behavior
    }
instance Applicative OValue where
  pure v = IOValue
    { push: absurd
    , pull: pure v
    , event: empty
    , behavior: pure v
    }
instance Semigroup a => Semigroup (OValue a) where
  append = lift2 append
instance Monoid m => Monoid (OValue m) where
  mempty = pure mempty
instance HeytingAlgebra a => HeytingAlgebra (OValue a) where
  conj = lift2 conj
  disj = lift2 disj
  tt = pure tt
  ff = pure ff
  implies = lift2 implies
  not = map not

type DValue t = IOValue t t
type OValue = IOValue Void

-- | Create a mutable cell.
make :: forall t. t -> Effect (DValue t)
make t = do
  ref <- Ref.new t
  { event, push } <- Event.create
  pure $ IOValue
    { push: \t' -> Ref.write t' ref *> push t'
    , pull: Ref.read ref
    , event
    , behavior: Behavior.behavior \sampler ->
        sampleOnRight (unsafeBang (Ref.read ref) <|> event) sampler
    }

-- | Memoize an `IOValue`, especially if it has some expensive mapping function.
memoize :: forall i o. IOValue i o -> Effect (IOValue i o)
memoize = memoize' >>> map _.value
memoize' :: forall i o. IOValue i o -> Effect { destroy :: Effect Unit, value :: IOValue i o }
memoize' iov = do
  IOValue value@{ push } <- make =<< get iov
  destroy <- subscribe iov push
  pure
    { destroy
    , value: IOValue value { push = flip set iov }
    }

unsafeBang :: forall a. Effect a -> Event a
unsafeBang getter = Event.makeEvent \cb -> do
  cb =<< getter
  pure (pure unit)

dedup :: forall f a. Event.IsEvent f => Eq a => f a -> f a
dedup = Event.withLast >>> Event.filterMap case _ of
  { last: Nothing, now } -> Just now
  { last: Just last, now }
    | last /= now -> Just now
    | otherwise -> Nothing

unsafeUnbang :: forall a. Event a -> Effect a
unsafeUnbang e = do
  ref <- Ref.new Nothing
  join $ Event.subscribe e (flip Ref.write ref <<< Just)
  Ref.read ref >>= case _ of
    Nothing -> throw "unsafeUnbang failed"
    Just v -> pure v

output :: forall i o. IOValue i o -> OValue o
output = lcmap absurd

listen :: forall i o. IOValue i o -> Event o
listen (IOValue { pull, event }) = unsafeBang pull <|> event

subscribe :: forall i o. IOValue i o -> (o -> Effect Unit) -> Effect (Effect Unit)
subscribe = Event.subscribe <<< listen

observe :: forall i o. IOValue i o -> Behavior o
observe (IOValue { behavior }) = behavior

observeOn :: forall i o r. IOValue i o -> Event (o -> r) -> Event r
observeOn iov = Behavior.sample (observe iov)

get :: forall i o. IOValue i o -> Effect o
get (IOValue { pull }) = pull

set :: forall i o. i -> IOValue i o -> Effect Unit
set v (IOValue { push }) = push v

-- | A central storage system for loading audio buffers and instantiating them
-- | while keeping track of their current play time.
newtype SoundManager =
  SoundManager
    { library :: Ref (Map String SoundMetadata)
    , context :: AudioContext
    }

-- TODO: support slicing samples
type SoundMetadata =
  { fileName :: String
  , context :: AudioContext
  , buffer :: BrowserAudioBuffer
  , duration :: Number
  , sampleRate :: Number
  , instanceCount :: Ref Int
  }

-- | Create a new `SoundManager`, with the specified `AudioContext` or a new one.
newManager :: Maybe AudioContext -> Effect SoundManager
newManager mctx = do
  context <- maybe OI.context pure mctx
  library <- Ref.new Map.empty
  pure $ SoundManager
    { library
    , context
    }

-- | Load a sound, returning it if it is already cached.
loadSound :: SoundManager -> String -> Aff SoundMetadata
loadSound manager@(SoundManager { library }) fileName = do
  liftEffect (Ref.read library) >>= Map.lookup fileName >>>
    maybe (reloadSound manager fileName) pure

-- | Force a sound to be reloaded from scratch
-- | (in case you need to invalidate the cache for some reason).
reloadSound :: SoundManager -> String -> Aff SoundMetadata
reloadSound (SoundManager manager) fileName = do
  buffer <- decodeAudioDataFromUri manager.context fileName
  instanceCount <- liftEffect $ Ref.new 0
  let
    sampleRate = OI.bufferSampleRate buffer
    duration = OI.bufferDuration buffer
    metadata =
      { fileName
      , context: manager.context
      , buffer
      , duration
      , sampleRate
      , instanceCount
      }
  liftEffect $ Ref.modify_ (Map.insert fileName metadata) manager.library
  pure metadata

-- | Start a cached sound from a specific time. (Units?)
instantiateAt :: Number -> SoundMetadata -> Effect SoundInstance
instantiateAt startOffset metadata = do
  id <- Ref.modify (_ + 1) metadata.instanceCount
  info <- make { startOffset: startOffset, playingSince: Nothing }
  pure $ SoundInstance
    { metadata
    , id
    , info
    }

instantiate :: SoundMetadata -> Effect SoundInstance
instantiate = instantiateAt 0.0

newtype SoundInstance = SoundInstance
  { metadata :: SoundMetadata
  , id :: Int
  , info :: DValue
    -- TODO: fix for delayed cutoff
    { startOffset :: Number
    , playingSince :: Maybe Number
    }
  }

soundTime :: SoundInstance -> OValue Number
soundTime (SoundInstance { metadata: { context }}) =
  contextTime context

soundOffset :: SoundInstance -> OValue Number
soundOffset sound@(SoundInstance { info }) = ado
  { startOffset, playingSince } <- output info
  currentTime <- soundTime sound
  in case playingSince of
    Just t0 | currentTime >= t0 ->
      startOffset + (currentTime - t0)
    _ -> startOffset

soundOffsetNorm :: SoundInstance -> OValue Number
soundOffsetNorm sound@(SoundInstance { metadata: { duration } }) =
  soundOffset sound <#> (_ / duration)

soundPlaying :: SoundInstance -> OValue Boolean
soundPlaying sound@(SoundInstance { info }) =
  (isJust <<< _.playingSince <$> output info)
  && (((_ >= 0.0) && (_ < 1.0)) <$> output (soundOffsetNorm sound))

contextTime :: AudioContext -> OValue Number
contextTime context = IOValue
  { push: absurd
  , pull: OI.getAudioClockTime context
  , event: dedup $ animationFrame <#> \_ -> unsafePerformEffect (OI.getAudioClockTime context)
  , behavior: Behavior.behavior \sampler ->
      sampler <#> \f -> f (unsafePerformEffect (OI.getAudioClockTime context))
  }

type SoundKey =
  { fileName :: String
  , id :: Int
  }
newtype SoundInstruction = SoundInstruction
  { delay :: Number
  , then :: Maybe
    { buffer :: BrowserAudioBuffer
    , bufferOffset :: Number
    }
  }
instance Semigroup SoundInstruction where
  append (SoundInstruction i1) (SoundInstruction i2) =
    SoundInstruction if i2.delay >= i1.delay then i2 else i1
derive instance Newtype SoundInstruction _

type SoundPlay =
  SoundInstance -> Effect (Maybe SoundInstruction)

inGroup :: SoundGroup SoundKey -> SoundPlay -> SoundInstance -> Effect Unit
inGroup g operation i@(SoundInstance { metadata: { fileName }, id }) = do
  operation i >>= traverse_ (setSound g { fileName, id })

restart :: SoundPlay
restart = restartAfter 0.0

restartAfter :: Number -> SoundPlay
restartAfter delay sound@(SoundInstance { metadata: { buffer }, info }) = do
  playingSince <- get $ soundTime sound
  set { startOffset: 0.0, playingSince: Just (playingSince + delay) } info
  pure $ pure $ SoundInstruction { delay, then: Just { buffer, bufferOffset: 0.0 } }

resume :: SoundPlay
resume = resumeAfter 0.0

resumeAfter :: Number -> SoundPlay
resumeAfter delay sound@(SoundInstance { metadata: { buffer, duration }, info }) = do
  playingSince <- get $ soundTime sound
  startOffset <- get $ soundOffset sound
  let
    newStartOffset =
      if startOffset >= duration
        then 0.0
        else startOffset
  set { startOffset: newStartOffset, playingSince: Just (playingSince + delay) } info
  pure $ pure $ SoundInstruction { delay, then: Just { buffer, bufferOffset: newStartOffset } }

stop :: SoundPlay
stop = stopAfter 0.0

stopAfter :: Number -> SoundPlay
stopAfter delay sound@(SoundInstance { info }) = do
  startOffset <- get $ soundOffset sound
  set { startOffset, playingSince: Nothing } info
  pure $ pure $ SoundInstruction { delay, then: Nothing }

reset :: SoundPlay
reset (SoundInstance { info }) = do
  set { startOffset: 0.0, playingSince: Nothing } info
  pure $ pure $ SoundInstruction { delay: 0.0, then: Nothing }

-- TODO
-- afterEnd :: SoundInstance -> Effect Unit -> Effect Unit
-- afterEnd

toggle :: SoundPlay
toggle sound = do
  get (soundPlaying sound) >>=
    if _
      then stop sound
      else resume sound

-- | Keeps track of audio channels so it can stop them.
-- |
-- | Note: does not keep track of current state, so you should subscribe to it
-- | immediately.
newtype SoundGroup k = SoundGroup
  { push :: k -> SoundInstruction -> Effect Unit
  , added :: Event (Event SoundInstruction)
  , context :: AudioContext
  }

newSoundGroup :: forall k. Ord k => Maybe AudioContext -> Effect (SoundGroup k)
newSoundGroup mctx = do
  context <- maybe OI.context pure mctx
  bus <- create
  let
    added = filterMap identity $
      mapAccum addition Set.empty bus.event
    addition existing new = Tuple (Set.insert new.address existing)
      (new <$ guard (not Set.member new.address existing))
  pure $ SoundGroup
    { push: \address payload -> do
        bus.push { address, payload }
    , added: added <#> \{ address, payload } ->
        pure payload <|> filterMap (\r -> if r.address == address then Just r.payload else Nothing) bus.event
    , context
    }

audioCtl
  :: forall nt r
   . Newtype nt (Variant (onOff :: AudioOnOff | r))
  => Boolean -> Number -> nt
audioCtl on delay = wrap $ inj (Proxy :: Proxy "onOff") $ dt (_ + delay) (if on then apOn else apOff)

embedSoundGroup :: forall k outputChannels lock payload. SoundGroup k -> Audible outputChannels lock payload
embedSoundGroup (SoundGroup { added }) =
  Ocarina.dyn $ (\e -> pure $ OC.sound $ switcher identity (filterMap identity (emitSound (dropFirst e) <$> e))) <$> added
  where
  emitSound :: Event SoundInstruction -> SoundInstruction -> Maybe (Audible outputChannels lock payload)
  emitSound _ (SoundInstruction { then: Nothing }) = empty
  emitSound next (SoundInstruction { delay, then: Just config }) = pure $ Ocarina.dyn $ pure $ oneOf
    [ pure $ OC.sound $
        Oc.playBuf config (pure (audioCtl true delay) <|> audioCtl false <<< _.delay <<< unwrap <$> next)
    ]

setSound :: forall k. SoundGroup k -> k -> SoundInstruction -> Effect Unit
setSound (SoundGroup { push, context }) k (SoundInstruction i) = do
  time <- get (contextTime context)
  push k (SoundInstruction i { delay = time + i.delay })

dropFirst :: forall f b. Filterable f => Event.IsEvent f => f b -> f b
dropFirst = filterMap (\{ last, now } -> now <$ last) <<< withLast

filter :: forall f b. Filterable f => (b -> Boolean) -> f b -> f b
filter p = filterMap (\v -> if p v then Just v else Nothing)

rising :: Event Boolean -> Event Unit
rising = withLast >>> filterMap \{ last, now } ->
  last >>= if _ then Nothing else guard now

threshold :: forall a. Ord a => OValue a -> a -> Event a
threshold ovalue reference =
  withLast (listen ovalue) # filterMap \{ last, now } ->
    last >>= \l -> if l >= reference || now < reference then Nothing else Just now

-- TODO: setTimeout before polling
audioEventThreshold :: AudioContext -> Number -> Event Number
audioEventThreshold = threshold <<< contextTime

soundOffsetThreshold :: SoundInstance -> Number -> Event Number
soundOffsetThreshold = threshold <<< soundOffset

soundOffsetNormThreshold :: SoundInstance -> Number -> Event Number
soundOffsetNormThreshold = threshold <<< soundOffsetNorm

soundOverrun :: SoundInstance -> Event Unit
soundOverrun = compose void $ soundOffsetNormThreshold <@> 1.0
