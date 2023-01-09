module Main where

import Prelude

import CSS.Color (Color)
import Control.Alt ((<|>))
import Control.Monad.ST as ST
import Control.Monad.State (execState, get, gets)
import Data.Align (align)
import Data.Array as Array
import Data.Array.NonEmpty as NEA
import Data.Array.ST as ArrayST
import Data.ArrayBuffer.Typed (toArray) as AB
import Data.Bifoldable (bifoldMap)
import Data.Bifunctor (class Bifunctor, bimap, lmap, rmap)
import Data.DateTime.Instant (Instant, unInstant)
import Data.DateTime.Instant as Instant
import Data.Foldable (class Foldable, foldl, for_, maximumBy, oneOf, sum, traverse_)
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.Function (on)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Int as Int
import Data.Lens ((%=), (.=))
import Data.Lens.Record (prop)
import Data.List.Types (List(..), (:))
import Data.Maybe (Maybe(..), fromMaybe, maybe, maybe')
import Data.Monoid (power)
import Data.Monoid.Additive (Additive(..))
import Data.Newtype (un, unwrap)
import Data.NonEmpty (NonEmpty, (:|))
import Data.Number ((%))
import Data.Number as Math
import Data.Semigroup.Foldable (intercalateMap)
import Data.String as String
import Data.String.CodeUnits as CodeUnits
import Data.These (These(..), these)
import Data.Traversable (traverse)
import Data.TraversableWithIndex (mapAccumLWithIndex)
import Data.Tuple (Tuple(..), fst, snd)
import Data.UInt as UInt
import Deku.Attribute (xdata, (!:=), (:=), (<:=>))
import Deku.Control as DC
import Deku.DOM as D
import Deku.Do (bind) as Deku
import Deku.Hooks (useMemoized)
import Deku.Listeners (click_)
import Deku.Toplevel (runInBody) as Deku
import Effect (Effect)
import Effect.Aff (Canceler(..), Milliseconds(..), launchAff_, makeAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Exception (throw)
import Effect.Ref as Ref
import Effect.Timer (setTimeout)
import Effect.Unsafe (unsafePerformEffect)
import FRP.Behavior as Behavior
import FRP.Event (Event, keepLatest, sampleOnRight)
import FRP.Event as Event
import FRP.Event.AnimationFrame (animationFrame)
import FRP.Event.Class (sampleOnRightOp)
import FRP.Event.Time (withTime)
import Ocarina.Control as Oc
import Ocarina.Core (Po2(..))
import Ocarina.Interpret (bufferSampleRate, context, getByteFrequencyData)
import Ocarina.Run (run2)
import Ocarina.WebAPI (AnalyserNodeCb(..), BrowserAudioBuffer)
import Partial.Unsafe (unsafeCrashWith, unsafePartial)
import Snowflow.Assets (main0Url, pizzs1Url)
import Snowflow.SoundManager (SoundManager(..), embedSoundGroup, inGroup, instantiate, listen, loadSound, newManager, newSoundGroup, restart, soundOffsetNorm, toggle)
import Type.Proxy (Proxy(..))
import Web.DOM.Element (setAttribute)
import Web.DOM.Element as Element
import Web.DOM.Node (setTextContent)
import Web.DOM.NonElementParentNode (getElementById)
import Web.Event.Event (EventType(..), preventDefault)
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.HTMLDocument (body)
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.HTMLElement as HTMLElement
import Web.HTML.Window (document)

smul :: forall f a. Bifunctor f => Semiring a => a -> f a a -> f a a
smul c = join bimap (c * _)

infixr 5 smul as *.

rotate :: Number -> Tuple Number Number -> Tuple Number Number
rotate degrees (Tuple x y) =
  let
    rad = Math.pi * degrees / 180.0
    c = Math.cos rad
    s = Math.sin rad
  in
    Tuple (c * x + s * y) (c * y - s * x)

roundDec :: Number -> String
roundDec v = CodeUnits.take 6 (show (Math.round (v * 100.0) / 100.0))

toPath :: Array (Tuple Number Number) -> String
toPath = foldMapWithIndex \i (Tuple x y) ->
  (if i == 0 then "M" else "L") <> show x <> " " <> show y

skew :: Number -> Number
skew = (_ / Math.sqrt 3.0)

unskew :: Number -> Number
unskew = (_ * Math.sqrt 3.0)

skew2 :: Number -> Number
skew2 = (_ / Math.sqrt 3.0) >>> (_ * 2.0)

skewY :: Number -> Tuple Number Number
skewY v = Tuple v (skew v)

skewY2 :: Number -> Tuple Number Number
skewY2 v = Tuple v (skew2 v)

incr :: Int -> Number -> Number
incr i v = Int.toNumber i * v

prefix :: forall b70. Semiring b70 => b70 -> Array b70 -> Array b70
prefix p ps = Array.cons p (add p <$> ps)

prepostfix :: forall a76. Semiring a76 => a76 -> a76 -> Array a76 -> Array a76
prepostfix p0 pn ps = Array.snoc (prefix p0 ps) pn

distr :: forall a. Tuple (Array (Array a)) (Array (Array a)) -> Array (Tuple (Array a) (Array a))
distr (Tuple [ x1, x2, x3, x4, x5, x6 ] [ y1, y2, y3, y4, y5, y6 ]) =
  let
    rTuple u v = join bimap Array.reverse (Tuple u v)
  in
    [ rTuple x1 y1, rTuple y2 y3, Tuple y4 y5, Tuple y6 x6, Tuple x5 x4, rTuple x3 x2 ]
distr _ = unsafeCrashWith "Bad data"

segment :: forall a. Int -> Int -> Array a -> Array (Array a)
segment _ _ [] = []
segment m n as = do
  let
    up = Int.toNumber

    getix :: Int -> Int -> a
    getix i j = case Array.index as (ix i j) of
      Nothing -> unsafeCrashWith "Not enough data"
      Just a -> a

    ix :: Int -> Int -> Int
    ix i j = Int.floor $
      up (Array.length as) *
        ((up i / up m) + (up j / up m / up n))

    mk :: forall b. Int -> (Int -> b) -> Array b
    mk len mapper = mapWithIndex (const <<< mapper) $
      Array.replicate len unit
  mk m \i -> mk n \j -> getix i j

-- TODO
interp :: Color -> Color -> Number -> Color
interp x _ _ = x

interpArray :: NonEmpty List Color -> Number -> Color
interpArray (x :| y : _) i | i <= 1.0 = interp x y (max 0.0 i)
interpArray (x :| Nil) _ = x
interpArray (_ :| y : zs) i = interpArray (y :| zs) (i - 1.0)

dedup :: forall f a. Event.IsEvent f => Eq a => f a -> f a
dedup = Event.withLast >>> Event.filterMap case _ of
  { last: Nothing, now } -> Just now
  { last: Just last, now }
    | last /= now -> Just now
    | otherwise -> Nothing

mkfreq :: BrowserAudioBuffer -> Number -> Number
mkfreq ab idxNorm = (bufferSampleRate ab / 2.0) * idxNorm

freqBins :: forall a. BrowserAudioBuffer -> Array a -> Array (Tuple Bin a)
freqBins ab binData =
  let
    up = Int.toNumber
    len = up $ Array.length binData
  in
    binData # mapWithIndex \i -> Tuple
      { center: mkfreq ab ((up i + 0.5) / len)
      , low: mkfreq ab ((up i + 0.0) / len)
      , high: mkfreq ab ((up i + 1.0) / len)
      }

halfstep :: Number
halfstep = Math.pow 2.0 (1.0 / 12.0)

mknote :: Number -> Number
mknote i = 55.0 * Math.pow 2.0 (i / 12.0)

binnote :: Int -> Bin
binnote i =
  { center: mknote (Int.toNumber i)
  , low: mknote (Int.toNumber i - 0.5)
  , high: mknote (Int.toNumber i + 0.5)
  }

type Bin =
  { center :: Number
  , low :: Number
  , high :: Number
  }

forN :: forall a. Int -> (Int -> a) -> Array a
forN n f = Array.replicate n unit # mapWithIndex \i _ -> f i

octaveRange :: Array Int
octaveRange = forN 12 identity

-- TODO
overlap :: Bin -> Bin -> Number
overlap target sample
  | target.high < sample.low = 0.0
  | target.low > sample.high = 0.0
  | otherwise =
      let
        missingTop = max 0.0 $ sample.high - target.high
        missingBottom = max 0.0 $ target.low - sample.low
        frac = 1.0 - (missingTop + missingBottom) / (sample.high - sample.low)
      in
        frac

matchingFreq :: Bin -> Array (Tuple Bin Number) -> Number
matchingFreq freq binned = sum $ binned <#> \(Tuple bin amp) -> amp * overlap freq bin

maxOctave :: Int
maxOctave = Int.floor (Math.log (44100.0 / 110.0) / Math.log (2.0))

noteOctaves :: Array (Tuple Int Bin)
noteOctaves = Array.replicate (12 * maxOctave) unit # mapWithIndex \i _ -> Tuple (i `mod` 12) (binnote i)

gatherOctaves :: Array (Tuple Int Number) -> Array (Array Number)
gatherOctaves allOctaves = octaveRange <#> \i ->
  snd <$> Array.filter (fst >>> eq i) allOctaves

injNote :: Int -> Int -> Number -> Array (Array Number)
injNote i0 j0 v =
  let
    corrected = Tuple (mod i0 12) (j0 + div i0 12)
  in
    octaveRange <#> \i -> forN maxOctave \j ->
      if Tuple i j == corrected then v else 0.0

alignL :: forall a b c. (a -> Maybe b -> c) -> Array a -> Array b -> Array c
alignL f = map Array.catMaybes <<< align case _ of
  This l -> Just (f l Nothing)
  Both l r -> Just (f l (Just r))
  That _ -> Nothing

sumSum :: forall f. Foldable f => f (Array (Array Number)) -> Array (Array Number)
sumSum = foldl (align (these identity identity (align bisum))) mempty

bisum :: forall a. Semiring a => These a a -> a
bisum = unwrap <<< bifoldMap Additive Additive

overtoneCorrection0 :: Array { note :: Int, octave :: Int, harmonic :: Int, weight :: Number }
overtoneCorrection0 = Array.fold $ forN (Int.pow 2 6 - 1) \harmonic ->
  if harmonic < 2 || harmonic `mod` 2 == 0 then mempty
  else
    let
      narmonic = Int.toNumber harmonic
      pitch = (Math.log narmonic / Math.log 2.0) * 12.0
      nearest = Int.round pitch
      -- Include the septimal minor seventh
      epsilon = 0.35
      diff = pitch % 1.0
      note = nearest `mod` 12
      octave = nearest `div` 12
    in
      if epsilon < diff && diff < 1.0 - epsilon then mempty
      else
        pure { note, octave, harmonic, weight: Math.sqrt (1.0 / narmonic) }

computeOvertoneCorrections :: Array (Array Number) -> Array (Array Number)
computeOvertoneCorrections values =
  unsafePartial do
    ST.run do
      working <- traverse (ArrayST.thaw <<< map (const 0.0)) values
      for_ overtoneCorrection0 \{ note, octave, weight } ->
        ST.for 0 (Array.length values) \i -> do
          let valuesi = values `Array.unsafeIndex` i
          ST.for 0 (Array.length valuesi) \j -> do
            let value = valuesi `Array.unsafeIndex` j
            (working `Array.unsafeIndex` ((note + i) `mod` 12)) #
              ArrayST.modify (octave + j) (_ + value * weight)
      traverse ArrayST.unsafeFreeze working

type OCC = { original :: Number, corrected :: Number, correction :: Number }

applyOvertoneCorrections :: Array (Array Number) -> Array (Array OCC)
applyOvertoneCorrections orig =
  let
    corrections = computeOvertoneCorrections orig
    correct original c =
      { original, corrected: max 0.0 $ original - fromMaybe 0.0 c, correction: fromMaybe 0.0 c }
  in
    alignL (\v -> maybe' (\_ -> join { original: _, corrected: _, correction: 0.0 } <$> v) (alignL correct v)) orig corrections

noteScoresC' :: BrowserAudioBuffer -> Array Number -> Array (Array OCC)
noteScoresC' ab fft = applyOvertoneCorrections $ gatherOctaves
  let
    binned = freqBins ab fft
  in
    noteOctaves <#> map \octaveBin ->
      matchingFreq octaveBin binned

noteScoresC :: BrowserAudioBuffer -> Array Number -> Array OCC
noteScoresC ab fft = sum <$> noteScoresC' ab fft

noteScores' :: BrowserAudioBuffer -> Array Number -> Array (Array Number)
noteScores' ab fft = map _.corrected <$> noteScoresC' ab fft

noteScores :: BrowserAudioBuffer -> Array Number -> Array Number
noteScores ab fft = sum <$> noteScores' ab fft

whichNote :: Array Number -> Maybe Int
whichNote = mapWithIndex Tuple >>> maximumBy (compare `on` snd) >>> map fst

guessNote :: Array Number -> String
guessNote = whichNote >>> maybe "?" noteName

noteName :: Int -> String
noteName =
  case _ of
    0 -> "A"
    1 -> "Bb"
    2 -> "B"
    3 -> "C"
    4 -> "C#"
    5 -> "D"
    6 -> "D#"
    7 -> "E"
    8 -> "F"
    9 -> "F#"
    10 -> "G"
    11 -> "G#"
    _ -> "??"

calcTimbre :: Array (Array Number) -> Array Number
calcTimbre = maximumBy (compare `on` sum) >>> fromMaybe []

calcVibe :: Array (Array Number) -> Array Number
calcVibe = foldl (align bisum) []

gradientVibe :: Array Number -> String
gradientVibe values = "linear-gradient(" <> Array.intercalate "," (Array.reverse components) <> ")"
  where
  format :: Int -> String
  format = Int.toStringAs Int.hexadecimal >>> \s ->
    (power "0" (2 - String.length s)) <> s
  maxScale = 12000.0
  weights =
    [ 3.5
    , 3.0
    , 2.5
    , 1.5
    , 0.5
    , 0.3
    , 0.15
    , 0.15
    ]
  colors =
    [ "#8A0085"
    , "#630D07"
    , "#115FFA"
    , "#11F0EC"
    ] >>= Array.replicate 2
  formColor c v =
    c <> format (min 255 $ Int.floor (255.0 * Math.pow (v / maxScale) 0.7))
  components = Array.zipWith formColor colors (Array.zipWith (*) weights values)

flipFlop :: forall a. Event a -> Event Boolean
flipFlop = Event.fold (\b _ -> not b) false

normalize :: Array Number -> Array (Tuple Number Number)
normalize values =
  let
    total = sum values
  in
    if total == 0.0 then [] else
      values # mapWithIndex \i v -> Tuple (sum (Array.take i values) / total) (v / total)

mapWithNorm :: forall a b. (Number -> a -> b) -> Array a -> Array b
mapWithNorm f as = as # mapWithIndex \i -> f (Int.toNumber i / Int.toNumber (Array.length as))

takeNorm :: forall a. Number -> Array a -> Array a
takeNorm norm as = Array.take (Int.floor (Int.toNumber (Array.length as) * norm)) as

takeNormOr :: forall a. Int -> Number -> Array a -> Array a
takeNormOr atLeast norm as = Array.take (max atLeast (Int.floor (Int.toNumber (Array.length as) * norm))) as

memoize :: forall m a. MonadEffect m => Event a -> m (Event a)
memoize e = liftEffect do
  { push, event } <- Event.create
  void $ Event.subscribe e push
  pure event

diffRel :: Instant -> Instant -> Milliseconds -> Number
diffRel prev now (Milliseconds timescale) =
  un Milliseconds (Instant.diff now prev) / timescale

momentumConstants ::
  { accel :: Milliseconds
  , decel :: Milliseconds
  , fade :: Milliseconds
  , maxAccel :: Number
  , maxDecel :: Number
  , maxSpeed :: Number
  , revive :: Milliseconds
  }
momentumConstants =
  { maxAccel: 500.0
  , maxDecel: -60.0
  , maxSpeed: 360.0
  , accel: Milliseconds 1000.0
  , decel: Milliseconds 500.0
  , fade: Milliseconds 3500.0
  , revive: Milliseconds 6000.0
  }

type Momentum =
  { tracking :: Tracking
  , notes :: Array (NoteMomentum ())
  }
type Tracking =
  { note :: Maybe Int
  , targetSpeed :: Number
  , currentAccel :: Number
  , currentSpeed :: Number
  , currentPosition :: Number
  , poked :: Instant
  , reversed :: Boolean
  , reversable :: ReverseState
  }
type NoteMomentum r =
  { targetSpeed :: Number, poked :: Instant | r }

data ReverseState
  = New
  | Reversable
  | Reversing
derive instance Eq ReverseState

zeroMomentum :: Momentum
zeroMomentum =
  { tracking:
    { note: Nothing
    , targetSpeed: zero
    , currentAccel: zero
    , currentSpeed: zero
    , currentPosition: zero
    , poked: bottom
    , reversed: true
    , reversable: New
    }
  , notes: octaveRange $>
      { targetSpeed: momentumConstants.maxSpeed
      , poked: bottom
      }
  }

updateMomentum :: Momentum -> Tuple Number (Tuple (Maybe Int) Instant) -> Momentum
updateMomentum momentum (Tuple volume (Tuple note now)) =
  let
    { tracking, notes } =
      updateNotes note now momentum
  in { tracking: applyMomentum tracking (Tuple volume now), notes }

updateNotes :: Maybe Int -> Instant -> Momentum -> Momentum
updateNotes new _ m@{ tracking: { note }} | note == new = m
updateNotes new now { tracking, notes } =
  { tracking: tracking { note = new, targetSpeed = accum }
  , notes: value
  }
  where
  updateNote :: Int -> Number -> NoteMomentum () -> { accum :: Number, value :: NoteMomentum () }
  updateNote i prev =
    case tracking.note == Just i, new == Just i of
      true, false -> { accum: prev, value: _ } <<< momentumChange now false
      false, true ->
        momentumChange now true >>> \updated ->
          { accum: updated.targetSpeed, value: updated }
      _, _ -> { accum: prev, value: _ }
  { accum, value } = mapAccumLWithIndex updateNote tracking.targetSpeed notes

momentumChange :: forall r. Instant -> Boolean -> NoteMomentum r -> NoteMomentum r
momentumChange now up r@{ poked } | poked == bottom =
  r
    { targetSpeed = if up then momentumConstants.maxSpeed else 0.0
    , poked = now
    }
momentumChange now up r@{ targetSpeed: original, poked } =
  let
    maxSpeed = momentumConstants.maxSpeed
    op = if up then (+) else (-)
  in r
    { targetSpeed = clamp 0.0 maxSpeed $ op original $
        maxSpeed * diffRel poked now
          (if up then momentumConstants.revive else momentumConstants.fade)
    , poked = now
    }

applyMomentum :: Tracking -> Tuple Number Instant -> Tracking
applyMomentum = flip \(Tuple vol now) -> execState do
  let volume = if vol < 0.01 then 0.0 else Math.sqrt $ clamp 0.0 1.0 $ vol * 4.0
  poked <- gets $ \{ poked } -> if poked == bottom then now else poked
  -- updateAccel
  do
    { currentSpeed, reversable } <- get
    targetSpeed <- gets \{ targetSpeed } ->
      (if reversable == Reversing then negate else identity) targetSpeed
    let
      pct = Math.abs targetSpeed / momentumConstants.maxSpeed
      decel = if reversable == Reversing
        then pct * (negate momentumConstants.maxAccel) + (1.0 - pct) * momentumConstants.maxDecel
        else momentumConstants.maxDecel
    prop (Proxy :: Proxy "currentAccel") %= \currentAccel ->
      clamp decel momentumConstants.maxAccel
        if currentSpeed < min (volume * momentumConstants.maxSpeed) targetSpeed
          then currentAccel + momentumConstants.maxAccel *
            diffRel poked now momentumConstants.accel
          else currentAccel - momentumConstants.maxAccel *
            diffRel poked now momentumConstants.decel
  -- updateSpeed
  currentAccel <- gets _.currentAccel
  do
    { reversable } <- get
    let delta = currentAccel * diffRel poked now (Milliseconds 1000.0)
    naive <- gets \{ currentSpeed } -> currentSpeed + delta
    if (naive <= 0.0 && reversable == Reversing)
      then do
        prop (Proxy :: Proxy "currentSpeed") .=
          clamp 0.0 momentumConstants.maxSpeed (Math.abs naive)
        prop (Proxy :: Proxy "reversed") %= not
        prop (Proxy :: Proxy "reversable") .= New
      else do
        prop (Proxy :: Proxy "currentSpeed") .=
          clamp 0.0 momentumConstants.maxSpeed naive
        prop (Proxy :: Proxy "reversable") %= case _ of
          New | naive > 0.55 * momentumConstants.maxSpeed -> Reversable
          Reversable | naive < 0.4 * momentumConstants.maxSpeed -> Reversing
          r -> r
  -- updatePosition
  { reversed, currentSpeed } <- get
  do
    prop (Proxy :: Proxy "currentPosition") %= \currentPosition ->
      currentPosition + (if reversed then negate else identity) currentSpeed *
        diffRel poked now (Milliseconds 1000.0)
  -- updateTargetSpeed:
  identity %= momentumChange now false

existingElement :: String -> Effect Element.Element
existingElement id =
  window >>= document >>= HTMLDocument.toNonElementParentNode >>>
  getElementById id >>= maybe (throw "Missing element") pure

setStatus :: String -> Effect Unit
setStatus status = do
  existingElement "status" >>= Element.toNode >>> setTextContent status



main :: Effect Unit
main = launchAff_ do
  liftEffect $ setStatus "Click to load samples"
  dlCtx <- makeAff \cb -> do
    listeners <- Ref.new []
    let
      cleanup = Ref.read listeners >>= traverse_ \r -> r
      ret = cleanup *> (cb <<< pure =<< context)
    listener <- eventListener \_ -> ret
    tgt <- window >>= document >>= body >>= maybe (throw "missing body") pure
    addEventListener (EventType "click") listener false (HTMLElement.toEventTarget tgt)
    listener2 <- eventListener \e -> preventDefault e *> ret
    tgt2 <- existingElement "title"
    addEventListener (EventType "click") listener2 false (Element.toEventTarget tgt2)
    Ref.write
      [ removeEventListener (EventType "click") listener false (HTMLElement.toEventTarget tgt)
      , removeEventListener (EventType "click") listener2 false (Element.toEventTarget tgt2)
      ] listeners
    pure $ Canceler \_ -> liftEffect cleanup
  liftEffect $ setStatus "Loading samples …"
  soundManager <- liftEffect $ newManager (Just dlCtx)
  liftEffect $ setStatus "Loading sample 0/1 …"
  pizzs1M <- loadSound soundManager pizzs1Url
  liftEffect $ setStatus "Loading sample 1/1 …"
  main0M <- loadSound soundManager main0Url
  main0I <- liftEffect $ instantiate main0M
  soundGroup <- liftEffect newSoundGroup
  let main0len = main0M.duration
  liftEffect $ setStatus "Starting UI …"

  let
    animationTime = map _.time (withTime animationFrame)
    size = 100.0
    radius = size / 2.0
    padding = 5.0

    armWidth = 2.0
    tineWidth = 4.1
    tineSkip = 1.0

    line (Tuple x1 y1) (Tuple x2 y2) =
      oneOf
        [ D.X1 !:= show x1
        , D.X2 !:= show x2
        , D.Y1 !:= show y1
        , D.Y2 !:= show y2
        ]

    drawTine tineSize =
      let
        p = skewY tineSize
        r = 1.0 / 2.0
      in
        [ p
        , p + Tuple 0.0 (r * tineWidth)
        , p + Tuple 0.0 (r * tineWidth) + Tuple (negate unskew (r * tineWidth / 2.0)) (r * tineWidth / 2.0)
        , Tuple 0.0 tineWidth
        , Tuple 0.0 (tineWidth + tineSkip)
        ]

    drawTines :: Array _ -> Array _
    drawTines widths =
      let
        capLength = skew armWidth
      in
        flip append [ Tuple capLength (radius - armWidth / 2.0), Tuple 0.0 radius ]
          $ prefix (Tuple capLength 0.0)
          $
            widths # foldMapWithIndex \i tineSize ->
              rmap (_ + incr i (tineWidth + tineSkip)) <$> drawTine tineSize
    drawArm angle (Tuple widths1 widths2) =
      map (rotate angle) $
        (lmap negate <$> drawTines widths1) <> Array.reverse (drawTines widths2)
    drawArms =
      toPath <<< foldMapWithIndex \i -> drawArm (incr i 60.0)

    rotating = animationTime <#> unInstant >>> unwrap >>> \t ->
      t / 1000.0 * 120.0

    rotateGrad = false
    useStroke = false
    useFilter = false

  analyserE <- liftEffect Event.create
  let
    analyserB = Behavior.behavior \e ->
      Event.filterMap identity
        $ sampleOnRight analyserE.event
        $ e <#> \sample ->
            map \analyser ->
              sample $ unsafePerformEffect $ AB.toArray =<< getByteFrequencyData analyser
    analysation =
      { cb: AnalyserNodeCb \v -> analyserE.push Nothing <$ analyserE.push (Just v)
      , fftSize: TTT12
      , smoothingTimeConstant: 0.5
      }
  sampled <- memoize $ map UInt.toNumber <$> dedup (Behavior.sample_ analyserB animationFrame)

  currentNoteScores <- memoize $ sampled <#> noteScores main0M.buffer
  currentNoteScores' <- memoize $ sampled <#> noteScores' main0M.buffer
  currentWhichNote <- memoize $ dedup $ currentNoteScores <#> whichNote

  currentVibe <- memoize $ currentNoteScores' <#> calcVibe
  let
    chillVibe prevs = mapWithIndex \i next ->
      let prev = fromMaybe 0.0 (prevs Array.!! i) in
      if next > prev then 0.6 * prev + 0.4 * next else 0.9 * prev + 0.1 * next
  currentVibeS <- memoize $ Event.fold chillVibe [] currentVibe
  currentVolume <- memoize $ currentVibeS <#> sum >>> (_ / 80000.0) >>> clamp 0.0 1.0

  currentMomentum <- memoize $ Event.fold updateMomentum zeroMomentum $
    sampleOnRightOp (Tuple <$> currentVolume) $
      sampleOnRightOp (Tuple <$> currentWhichNote) animationTime
  currentAngle <- pure $ currentMomentum <#> _.tracking >>> _.currentPosition

  started <- liftEffect $ Ref.new false
  let
    ocarinaOfTime = whenM (not <$> Ref.read started) do
      Ref.write true started
      let
        ctx = case soundManager of
          SoundManager { context } -> context
      for_ ["help", "title"] \id -> do
        el <- existingElement id
        setAttribute "style" "transition:opacity 0.5s ease-out;opacity:0" el
        setTimeout 1000 $ liftEffect $ setAttribute "style" "display:none" el
      void $ run2 ctx
        [ Oc.analyser_ analysation
            [ embedSoundGroup soundGroup ]
        ]

  liftEffect $ setStatus ""
  liftEffect $ setAttribute "style" "" =<< existingElement "help"

  liftEffect $ Deku.runInBody Deku.do
    main0Time <- useMemoized $ listen $ soundOffsetNorm main0I
    Array.fold
      [ D.div (D.Id !:= "controls")
        [ D.label_
          [ flip D.input [] $ oneOf
            [ D.Xtype !:= "checkbox"
            , D.Checked !:= "false"
            ]
          , DC.text_ " Auto chords"
          ]
        , D.label_
          [ flip D.input [] $ oneOf
            [ D.Xtype !:= "checkbox"
            , D.Checked !:= "false"
            ]
          , DC.text_ " Straight through"
          ]
        ]
      , D.div (D.Class !:= "scene" <|> D.Style <:=> (currentVibeS <#> \vibe -> "background:" <> gradientVibe vibe))
        [ D.div_ $ [1.697, 4.825, 8.424, 26.270, 28.489] <#> (_ / main0len) >>> \tRule -> flip D.hr [] $ oneOf
          [ D.Class !:= "chord"
          , pure (xdata "chord-name" "Emin")
          , D.OnMousedown !:= do
              ocarinaOfTime *> do inGroup soundGroup restart =<< instantiate pizzs1M
          , D.Style <:=> do
              let pct v = "calc(" <> show ((2.0 * tRule - v) * 100.0) <> "% - " <> show ((v - 0.5) * size) <> "px)"
              dedup main0Time <#> clamp 0.0 1.0 >>>
                \t -> "position: absolute; left: 0; top: " <> pct t <> "; width: 100vw; height: 1px"
          ]
        , D.svg
            ( oneOf
                [ D.Width !:= show (padding + size + padding)
                , D.Height !:= show (padding + size + padding)
                , D.ViewBox !:= maybe mempty (intercalateMap " " show) (NEA.fromArray [ -radius - padding, -radius - padding, size + padding + padding, size + padding + padding ])
                , click_ $ ocarinaOfTime *> inGroup soundGroup toggle main0I
                , D.Style <:=> do
                    -- 6.72738%
                    let pct v = "calc(" <> show (v * 100.0) <> "% - " <> show (v * size) <> "px)"
                    let centered = pct 0.5
                    dedup main0Time <#> clamp 0.0 1.0 >>>
                      \t -> "position: absolute; left: " <> centered <> "; top: " <> pct t <> ";"
                ]
            )
            [ D.defs_
                [ D.linearGradient
                    ( oneOf
                        [ D.Id !:= "linearGradientArm"
                        , D.GradientUnits !:= "userSpaceOnUse"
                        , keepLatest $ (if rotateGrad then rotating else pure 0.0) <#> \angle ->
                            line (rotate angle (Tuple 0.0 radius)) (rotate angle (Tuple 0.0 (negate radius)))
                        ]
                    )
                    [ flip D.stop [] $ oneOf
                        [ D.Offset !:= "0"
                        , D.StopColor !:= "#6b91ab"
                        , D.StopOpacity !:= "0.9"
                        ]
                    , flip D.stop [] $ oneOf
                        [ D.Offset !:= "1"
                        , D.StopColor !:= "#f3feff"
                        , D.StopOpacity !:= "0.95"
                        ]
                    ]
                ]
            , D.g
                ( oneOf
                    [ D.Fill !:= "#bfe6ff"
                    , D.StrokeLinecap !:= "butt"
                    , D.StrokeLinejoin !:= "miter"
                    , D.StrokeOpacity !:= "1"
                    , currentAngle <#> \angle ->
                        D.Transform := "rotate(" <> show (((angle + 30.0) % if rotateGrad then 360.0 else 60.0) - 30.0) <> ")"
                    ]
                ) $ join
                let
                  v = 3.0
                in
                  let
                    vs = [ 1.0, v, v, 6.0, 4.0, 4.0, 5.0, v, 1.0 ]
                  in
                    let
                      vss = join Tuple vs
                    in
                      [ pure $ flip D.path [] $ oneOf
                          [ D.D !:= drawArms [ vss, vss, vss, vss, vss, vss ]
                          , D.FillOpacity !:= ".91"
                          , D.Stroke !:= if useStroke then "url(#linearGradientArm)" else "none"
                          , D.StrokeWidth !:= "0.6"
                          , D.Filter !:= if useFilter then "url(#filter17837)" else "none"
                          ]
                      ]
            ]
        ]
      ]
  liftEffect $ setStatus ""
