module Main where

import Prelude

import CSS.Color (Color)
import Control.Alt ((<|>))
import Control.Apply (lift2)
import Control.Monad.ST as ST
import Control.Monad.State (execState, get, gets)
import Control.Plus (empty)
import Data.Align (align)
import Data.Array ((!!))
import Data.Array as Array
import Data.Array.NonEmpty as NEA
import Data.Array.ST as ArrayST
import Data.ArrayBuffer.Typed (toArray) as AB
import Data.Bifoldable (bifoldMap)
import Data.Bifunctor (class Bifunctor, bimap, lmap, rmap)
import Data.DateTime.Instant (Instant, unInstant)
import Data.DateTime.Instant as Instant
import Data.Either (Either(..))
import Data.Foldable (class Foldable, foldl, for_, maximumBy, oneOf, sum)
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.Function (on)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Int as Int
import Data.Lens ((%=))
import Data.Lens.Record (prop)
import Data.List.Types (List(..), (:))
import Data.Maybe (Maybe(..), fromMaybe, isJust, maybe, maybe')
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
import Data.Tuple (Tuple(..), fst, snd, uncurry)
import Data.Tuple.Nested ((/\))
import Data.UInt as UInt
import Debug (spy)
import Deku.Attribute ((!:=), (:=), (<:=>))
import Deku.Control as DC
import Deku.DOM as D
import Deku.Do (bind) as Deku
import Deku.Hooks (useState)
import Deku.Listeners (click, slider_)
import Deku.Toplevel (runInBody) as Deku
import Effect (Effect)
import Effect.Aff (Milliseconds(..), launchAff_)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Class.Console (log)
import Effect.Unsafe (unsafePerformEffect)
import FRP.Behavior as Behavior
import FRP.Event (Event, EventIO, keepLatest, sampleOnRight)
import FRP.Event as Event
import FRP.Event.AnimationFrame (animationFrame)
import FRP.Event.Class (sampleOnRightOp)
import FRP.Event.Time (withTime)
import Ocarina.Control (gain_)
import Ocarina.Control as Oc
import Ocarina.Core (Po2(..), bangOn, sound, silence, dyn)
import Ocarina.Interpret (bufferSampleRate, context, context_, decodeAudioDataFromUri, getAudioClockTime, getByteFrequencyData)
import Ocarina.Run (run2)
import Ocarina.WebAPI (AnalyserNodeCb(..), BrowserAudioBuffer)
import Partial.Unsafe (unsafeCrashWith, unsafePartial)
import QualifiedDo.Alt as Alt
import Snowflow.Assets (main0Url, pizzs1Url)
import Type.Proxy (Proxy(..))
import Unsafe.Coerce (unsafeCoerce)
import Web.DOM.Element (setAttribute)
import Web.HTML (window)
import Web.HTML.HTMLDocument (body)
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
overtoneCorrection0 = spy "overtoneCorrection0" $ Array.fold $ forN (Int.pow 2 6 - 1) \harmonic ->
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
  maxScale = 10000.0
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
  , maxSpeed: 300.0
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
  }
type NoteMomentum r =
  { targetSpeed :: Number, poked :: Instant | r }

zeroMomentum :: Momentum
zeroMomentum =
  { tracking:
    { note: Nothing
    , targetSpeed: zero
    , currentAccel: zero
    , currentSpeed: zero
    , currentPosition: zero
    , poked: bottom
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
    { currentSpeed, targetSpeed } <- get
    prop (Proxy :: Proxy "currentAccel") %= \currentAccel ->
      clamp momentumConstants.maxDecel momentumConstants.maxAccel
        if currentSpeed < min (volume * momentumConstants.maxSpeed) targetSpeed
          then currentAccel + momentumConstants.maxAccel *
            diffRel poked now momentumConstants.accel
          else currentAccel - momentumConstants.maxAccel *
            diffRel poked now momentumConstants.decel
  -- updateSpeed
  currentAccel <- gets _.currentAccel
  do
    prop (Proxy :: Proxy "currentSpeed") %= \currentSpeed ->
      clamp 0.0 momentumConstants.maxSpeed $
        currentSpeed + currentAccel * diffRel poked now (Milliseconds 1000.0)
  -- updatePosition
  currentSpeed <- gets _.currentSpeed
  do
    prop (Proxy :: Proxy "currentPosition") %= \currentPosition ->
      currentPosition + currentSpeed * diffRel poked now (Milliseconds 1000.0)
  -- updateTargetSpeed:
  identity %= momentumChange now false



main :: Effect Unit
main = launchAff_ do
  dlCtx <- context
  pizzs1 <- decodeAudioDataFromUri dlCtx pizzs1Url
  main0 <- decodeAudioDataFromUri dlCtx main0Url
  log (unsafeCoerce main0)

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
  sampleNorm <- liftEffect Event.create
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
  sampleNormed <- memoize $ dedup $ lift2 (takeNormOr (6 * 9)) (sampleNorm.event <|> pure 0.5) (mapWithNorm Tuple <$> sampled <|> pure [ Tuple 0.0 0.0 ])

  currentNoteScores <- memoize $ sampled <#> noteScores main0
  currentNoteScoresC <- memoize $ sampled <#> noteScoresC main0
  currentNoteScores' <- memoize $ sampled <#> noteScores' main0
  currentWhichNote <- memoize $ dedup $ currentNoteScores <#> whichNote

  currentTimbre <- memoize $ currentNoteScores' <#> calcTimbre
  currentTimbreN <- memoize $ currentTimbre <#> normalize
  currentVibe <- memoize $ currentNoteScores' <#> calcVibe
  let
    chillVibe prevs = mapWithIndex \i next ->
      let prev = fromMaybe 0.0 (prevs Array.!! i) in
      if next > prev then 0.5 * prev + 0.5 * next else 0.8 * prev + 0.2 * next
  currentVibeS <- memoize $ Event.fold chillVibe [] currentVibe
  currentVolume <- memoize $ currentVibeS <#> sum >>> (_ / 80000.0) >>> clamp 0.0 1.0
  currentVibeN <- memoize $ currentVibeS <#> normalize

  currentMomentum <- memoize $ Event.fold updateMomentum zeroMomentum $
    sampleOnRightOp (Tuple <$> currentVolume) $
      sampleOnRightOp (Tuple <$> currentWhichNote) animationTime
  currentAngle <- pure $ currentMomentum <#> _.tracking >>> _.currentPosition

  void $ liftEffect $ Event.subscribe currentVibeS \vibe -> do
    bdy <- window >>= document >>= body
    setAttribute "style" ("background:" <> gradientVibe vibe) <<< HTMLElement.toElement # for_ bdy

  -- as the page is fully interactive audio from the get-go, we
  -- never want to recreate audio contexts
  -- to that end, we create a single audio context and initialize it
  -- on the first click, making sure it is initialized right away
  -- so that there are no issues on iOS
  -- from then, we use it for the rest of the app
  leftSnowflakeStartTime :: EventIO Number <- liftEffect $ Event.create
  leftSnowflakePlaying :: EventIO Boolean <- liftEffect $ Event.create
  rightSnowflakeBang :: EventIO Unit <- liftEffect $ Event.create
  let
    ocarinaOfTime = do
      ctx <- context_
      void $ run2 ctx
        [ Oc.analyser_ analysation
            --[ Oc.gain_ 0.15 [ Oc.sinOsc 440.0 bangOn ] ]
            [ gain_ 1.0
                [ dyn
                    ( map
                        ( \{ startTime, io } ->

                            if io then
                              Alt.do
                                leftSnowflakePlaying.event $> silence
                                pure $ sound
                                  $ Oc.playBuf
                                      { buffer: main0, bufferOffset: startTime }
                                      bangOn
                            else empty

                        )
                        ({ startTime: _, io: _ } <$> leftSnowflakeStartTime.event <*> leftSnowflakePlaying.event)
                    )
                ]
            , gain_ 1.0
                [ dyn
                    ( map
                        ( \_ -> pure $ sound
                            $ Oc.playBuf
                                pizzs1
                                bangOn
                        )
                        (rightSnowflakeBang.event)
                    )
                ]
            ]
        ]
      pure ctx
  liftEffect $ Deku.runInBody Deku.do
    setOcarina /\ ocarina <- useState ocarinaOfTime
    let
      ocarinaOnlyOnce o = do
        ctx <- o
        setOcarina (pure ctx)
        pure ctx
    setStartTime /\ startTime <- useState Nothing
    D.div_ $ join $ Array.replicate 1
      [ D.p_ [ DC.text_ "Click on the large snowflake to start the music!" ]
      , D.p_ [ DC.text_ "(iPhone/iPad users: turn on your ringer to hear sound.)" ]
      , D.p_ [ DC.text_ "This slider clips the higher frequencies from the snowflake FFT display (right = all frequencies, left = just the bottom 6 arms*9 tines worth of bins):" ]
      , flip D.input [] $ oneOf
          [ D.Xtype !:= "range"
          , D.Min !:= "0.0"
          , D.Max !:= "1.0"
          , D.Step !:= "any"
          , D.Value !:= "0.5"
          , slider_ sampleNorm.push
          ]
      , D.svg
          ( oneOf
              [ D.Width !:= show 240.0
              , D.Height !:= show 240.0
              , D.Style !:= "display:block"
              ]
          ) $ join $ Array.reverse
            [ pure $ flip D.rect [] $ oneOf
                [ D.Width !:= show 240.0
                , D.X !:= show 0.0
                , D.Height !:= show 1.0
                , D.Y <:=> map (show <<< (240.0 - _)) (pure 0.0 <|> (_ / (4.0 * 100.0)) <<< sum <$> currentNoteScores)
                , D.Fill !:= "white"
                ]
            , octaveRange >>= \i ->
              let
                height = dedup $ currentNoteScoresC # Event.filterMap \scores ->
                  (scores !! i) <#> \{ original: score } -> Math.round $ score / 100.0
                heightC = dedup $ currentNoteScoresC # Event.filterMap \scores ->
                  (scores !! i) <#> \{ corrected: score } -> Math.round $ score / 100.0
              in
                flip D.rect [] <$>
                  [ oneOf
                      [ D.Width !:= show 20.0
                      , D.X !:= show (Int.toNumber i * 20.0)
                      , D.Height <:=> map show height
                      , D.Y <:=> map (show <<< (240.0 - _)) height
                      , D.Fill !:= "gray"
                      ]
                  , oneOf
                      [ D.Width !:= show 20.0
                      , D.X !:= show (Int.toNumber i * 20.0)
                      , D.Height <:=> map show heightC
                      , D.Y <:=> map (show <<< (240.0 - _)) heightC
                      , D.Fill <:=> (currentWhichNote <#> eq (Just i) >>> if _ then "yellow" else "green")
                      ]
                  ]
            ]
      , D.svg
          ( oneOf
              [ D.Width !:= show 240.0
              , D.Height !:= show 20.0
              , D.Style !:= "display:block"
              ]
          ) $ forN maxOctave \i ->
          let
            info = dedup $ currentTimbreN <#> flip Array.index i >>> fromMaybe (Tuple 0.0 0.0) >>> join bimap (_ * 240.0)
          in
            flip D.rect [] $ oneOf
              [ D.Height !:= show 20.0
              , D.X <:=> map (show <<< fst) info
              , D.Width <:=> map (show <<< snd) info
              , D.Fill !:= if i == 0 then "red" else if (mod i 2) == 0 then "blue" else "gray"
              ]
      , D.svg
          ( oneOf
              [ D.Width !:= show 240.0
              , D.Height !:= show 20.0
              , D.Style !:= "display:block"
              ]
          ) $ forN maxOctave \i ->
          let
            info = dedup $ currentVibeN <#> flip Array.index i >>> fromMaybe (Tuple 0.0 0.0) >>> join bimap (_ * 240.0)
          in
            flip D.rect [] $ oneOf
              [ D.Height !:= show 20.0
              , D.X <:=> map (show <<< fst) info
              , D.Width <:=> map (show <<< snd) info
              , D.Fill !:= if i == 0 then "red" else if (mod i 2) == 0 then "blue" else "gray"
              ]
      , D.h1_ [ DC.text $ pure "..." <|> dedup (maybe "?" noteName <$> currentWhichNote) ]
      , D.br_ []
      --, DC.text $ map (show <<< map Int.round) $ (sampleOnLeft_ (interval 1000) sampled) <#> map snd >>> noteScores main0
      , D.br_ []
      --, DC.text $ map (show <<< map Int.round) $ (sampleOnLeft_ (interval 1000) sampled) <#> map snd
      , D.br_ []
      , D.svg
          ( oneOf
              [ D.Width !:= show (padding + 2.0 * size + padding)
              , D.Height !:= show (padding + 2.0 * size + padding)
              , D.ViewBox !:= maybe mempty (intercalateMap " " show) (NEA.fromArray [ -radius - padding, -radius - padding, size + padding + padding, size + padding + padding ])
              , click $ (Tuple <$> startTime <*> ocarina) <#> \(st /\ o) -> do
                  ctx <- ocarinaOnlyOnce o
                  timeNow <- getAudioClockTime ctx
                  let
                    judgeRestart :: forall x. _ -> (_ -> x) -> (_ -> x) -> x
                    judgeRestart b l r = let t = timeNow - b in if t > 34.0 then l t else r t
                  let
                    newStartTime = case st of
                      Nothing -> Just 0.0
                      Just (Right a) -> Just a
                      Just (Left b) -> judgeRestart b (const $ Just 0.0) (const Nothing)
                  setStartTime
                    ( Just case st of
                        Nothing -> Left timeNow
                        Just (Right a) -> Left (timeNow - a)
                        Just (Left b) -> judgeRestart b (const $ Left timeNow) Right
                    )
                  for_ newStartTime leftSnowflakeStartTime.push
                  leftSnowflakePlaying.push (isJust newStartTime)
              ]
          )
          [ D.g
              ( oneOf
                  [ D.Fill !:= "#bfe6ff"
                  , D.StrokeLinecap !:= "butt"
                  , D.StrokeLinejoin !:= "miter"
                  , D.StrokeOpacity !:= "1"
                  ]
              ) $ join
              [ pure $ flip D.path [] $ oneOf
                  [ D.D <:=> do
                      dedup $ (pure [ Tuple 0.0 0.0 ] <|> sampleNormed) <#> \freqs ->
                        let
                          segmented = segment 6 9 $ freqs <#> uncurry \i -> (_ / (32.0 - i * 24.0))
                        in
                          drawArms (distr (join Tuple segmented))
                  , D.FillOpacity !:= ".91"
                  , D.Stroke !:= if useStroke then "url(#linearGradientArm)" else "none"
                  , D.StrokeWidth !:= "0.6"
                  , D.Filter !:= if useFilter then "url(#filter17837)" else "none"
                  ]
              ]
          ]
      , D.div_
        let
          metrics = (_.tracking >>> _) <$>
            [ _.targetSpeed >>> (_ / momentumConstants.maxSpeed)
            , _.currentAccel >>> (_ / momentumConstants.maxAccel) >>> (_ / 2.0) >>> (_ + 0.5)
            , _.currentSpeed >>> (_ / momentumConstants.maxSpeed)
            ]
        in metrics <#> \metric ->
          flip D.input [] $ oneOf
            [ D.Xtype !:= "range"
            , D.Min !:= "0.0"
            , D.Max !:= "1.0"
            , D.Step !:= "any"
            , D.Value <:=> do
                (pure zeroMomentum <|> currentMomentum) <#> metric >>> show
            ]
      , D.svg
          ( oneOf
              [ D.Width !:= show (padding + size + padding)
              , D.Height !:= show (padding + size + padding)
              , D.ViewBox !:= maybe mempty (intercalateMap " " show) (NEA.fromArray [ -radius - padding, -radius - padding, size + padding + padding, size + padding + padding ])
              , D.OnMousedown <:=> do
                  ocarina <#> \o -> do
                    void $ ocarinaOnlyOnce o
                    rightSnowflakeBang.push unit
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
