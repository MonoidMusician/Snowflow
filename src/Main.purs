module Main where

import Prelude

import CSS.Color (Color)
import Control.Alt ((<|>))
import Control.Apply (lift2)
import Data.Array as Array
import Data.Array.NonEmpty as NEA
import Data.ArrayBuffer.Typed (toArray) as AB
import Data.Bifunctor (class Bifunctor, bimap, lmap, rmap)
import Data.DateTime.Instant (unInstant)
import Data.Foldable (maximumBy, oneOf, sum)
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.Function (on)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Int as Int
import Data.List.Types (List(..), (:))
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (unwrap)
import Data.NonEmpty (NonEmpty, (:|))
import Data.Number ((%))
import Data.Number as Math
import Data.Semigroup.Foldable (intercalateMap)
import Data.Tuple (Tuple(..), fst, snd, uncurry)
import Data.UInt as UInt
import Deku.Attribute ((!:=), (:=))
import Deku.Control as DC
import Deku.DOM as D
import Deku.Listeners (slider_)
import Deku.Toplevel as Deku
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Effect.Unsafe (unsafePerformEffect)
import FRP.Behavior as Behavior
import FRP.Event (keepLatest, sampleOnRight)
import FRP.Event as Event
import FRP.Event.AnimationFrame (animationFrame)
import FRP.Event.Time (withTime)
import Ocarina.Control as Oc
import Ocarina.Core (Po2(..), bangOn)
import Ocarina.Interpret (context, decodeAudioDataFromUri, getByteFrequencyData, bufferSampleRate)
import Ocarina.Run (run2_)
import Ocarina.WebAPI (AnalyserNodeCb(..), BrowserAudioBuffer)
import Partial.Unsafe (unsafeCrashWith)
import Unsafe.Coerce (unsafeCoerce)

smul :: forall f a. Bifunctor f => Semiring a => a -> f a a -> f a a
smul c = join bimap (c * _)

infixr 5 smul as *.

rotate :: Number -> Tuple Number Number -> Tuple Number Number
rotate degrees (Tuple x y) =
  let
    rad = Math.pi * degrees / 180.0
    c = Math.cos rad
    s = Math.sin rad
  in Tuple (c * x + s * y) (c * y - s * x)

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
distr (Tuple [x1,x2,x3,x4,x5,x6] [y1,y2,y3,y4,y5,y6]) =
  let rTuple u v = join bimap Array.reverse (Tuple u v) in
  [rTuple x1 y1, rTuple y2 y3, Tuple y4 y5, Tuple y6 x6, Tuple x5 x4, rTuple x3 x2]
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
interp x y i = x

interpArray :: NonEmpty List Color -> Number -> Color
interpArray (x :| y : _) i | i <= 1.0 = interp x y (max 0.0 i)
interpArray (x :| Nil) _ = x
interpArray (_ :| y : zs) i = interpArray (y :| zs) (i - 1.0)




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
halfstep = Math.pow 2.0 (1.0/12.0)

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

octave :: Array Int
octave = Array.replicate 12 unit # mapWithIndex \i _ -> i

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
    in frac

matchingFreq :: Bin -> Array (Tuple Bin Number) -> Number
matchingFreq freq binned = sum $ binned <#> \(Tuple bin amp) -> amp * overlap freq bin

maxOctave :: Int
maxOctave = Int.floor (Math.log (44100.0 / 110.0) / Math.log 2.0)

noteOctaves :: Array (Tuple Int Bin)
noteOctaves = Array.replicate (12 * maxOctave) unit # mapWithIndex \i _ -> Tuple (i `mod` 12) (binnote i)

gatherOctaves :: Array (Tuple Int Number) -> Array Number
gatherOctaves allOctaves = map sum $ octave <#> \i ->
  snd <$> Array.filter (fst >>> eq i) allOctaves

noteScores' :: BrowserAudioBuffer -> Array Number -> Array Number
noteScores' ab fft = gatherOctaves
  let
    binned = freqBins ab fft
  in
    noteOctaves <#> map \octaveBin ->
      matchingFreq octaveBin binned

noteScores :: BrowserAudioBuffer -> Array Number -> Array Number
noteScores ab fft = noteScores' ab fft

guessNote :: Array Number -> String
guessNote = mapWithIndex Tuple >>> maximumBy (compare `on` snd) >>> case _ of
  Nothing -> "?"
  Just (Tuple i _) ->
    case i of
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


mapWithNorm :: forall a b. (Number -> a -> b) -> Array a -> Array b
mapWithNorm f as = as # mapWithIndex \i -> f (Int.toNumber i / Int.toNumber (Array.length as))

takeNorm :: forall a. Number -> Array a -> Array a
takeNorm norm as = Array.take (Int.floor (Int.toNumber (Array.length as) * norm)) as

takeNormOr :: forall a. Int -> Number -> Array a -> Array a
takeNormOr atLeast norm as = Array.take (max atLeast (Int.floor (Int.toNumber (Array.length as) * norm))) as




main :: Effect Unit
main = launchAff_ do
  { event, push } <- liftEffect Event.create
  ctx <- context
  pizzs1 <- decodeAudioDataFromUri ctx "samples/pizzs1.wav"
  main0 <- decodeAudioDataFromUri ctx "samples/main0.wav"
  log (unsafeCoerce main0)
  -- Biased to the high notes in the scale??
  {-
  let fakefft = Array.replicate (1024) 1.0
  logShow (noteScores' main0 fakefft)
  logShow $ noteOctaves <#> map \octaveBin ->
    freqBins main0 fakefft <#> \(Tuple fbin _) ->
      overlap octaveBin fbin
  logShow $ freqBins main0 fakefft
  -}

  let
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
      in flip append [Tuple capLength (radius - armWidth / 2.0), Tuple 0.0 radius] $
        prefix (Tuple capLength 0.0) $
          widths # foldMapWithIndex \i tineSize ->
            rmap (_ + incr i (tineWidth + tineSkip)) <$> drawTine tineSize
    drawArm angle (Tuple widths1 widths2) =
      map (rotate angle) $
        (lmap negate <$> drawTines widths1) <> Array.reverse (drawTines widths2)
    drawArms =
      toPath <<< foldMapWithIndex \i -> drawArm (incr i 60.0)

    rotating = map _.time (withTime animationFrame) <#> unInstant >>> unwrap >>> \t ->
      t / 1000.0 * 120.0

    rotateGrad = false
    useStroke = false
    useFilter = false

  analyserE <- liftEffect Event.create
  sampleNorm <- liftEffect Event.create
  let
    analyserB = Behavior.behavior \e ->
      Event.filterMap identity $
        sampleOnRight analyserE.event $ e <#> \sample ->
          map \analyser ->
            sample $ unsafePerformEffect $ AB.toArray =<< getByteFrequencyData analyser
    sampled = mapWithNorm Tuple <<< map UInt.toNumber <$> Behavior.sample_ analyserB animationFrame
    sampleNormed = lift2 (takeNormOr (6*9)) (sampleNorm.event <|> pure 1.0) sampled

  liftEffect $ Deku.runInBody do
    D.div_ $ join $ Array.replicate 1
      [ D.p_ [ DC.text_ "Click on the large snowflake to start the music!" ]
      , D.p_ [ DC.text_ "(iPhone/iPad users: turn on your ringer to hear sound.)" ]
      , D.p_ [ DC.text_ "This slider clips the higher frequencies from the snowflake FFT display (right = all frequencies, left = just the bottom 6 arms*9 tines worth of bins):" ]
      , flip D.input [] $ oneOf
        [ D.Xtype !:= "range"
        , D.Min !:= "0.0"
        , D.Max !:= "1.0"
        , D.Step !:= "any"
        , D.Value !:= "1.0"
        , slider_ sampleNorm.push
        ]
      , D.h1_ [ DC.text $ map guessNote $ sampled <#> map snd >>> noteScores main0 ]
      , D.br_ []
      --, DC.text $ map (show <<< map Int.round) $ (sampleOnLeft_ (interval 1000) sampled) <#> map snd >>> noteScores main0
      , D.br_ []
      --, DC.text $ map (show <<< map Int.round) $ (sampleOnLeft_ (interval 1000) sampled) <#> map snd
      , D.br_ []
      , D.svg
          (oneOf
            [ D.Width !:= show (padding + 2.0 * size + padding)
            , D.Height !:= show (padding + 2.0 * size + padding)
            , D.ViewBox !:= maybe mempty (intercalateMap " " show) (NEA.fromArray [-radius-padding, -radius-padding, size+padding+padding, size+padding+padding])
            , (pure Nothing <|> event) <#> \e ->
                D.OnClick := case e of
                  Just x -> x *> push Nothing
                  _ -> run2_ [ Oc.analyser_ { cb: AnalyserNodeCb \v -> analyserE.push Nothing <$ analyserE.push (Just v), fftSize: TTT12 } $ flip const [ Oc.gain_ 0.15 [ Oc.sinOsc 440.0 bangOn ] ] [ Oc.playBuf main0 bangOn ] ]
                         >>= Just >>> push
            ]
          )
          [ D.g
            (oneOf
              [ D.Fill !:= "#bfe6ff"
              , D.StrokeLinecap !:= "butt"
              , D.StrokeLinejoin !:= "miter"
              , D.StrokeOpacity !:= "1"
              ]
            ) $ join
            [ pure $ flip D.path [] $ oneOf
                [ (pure [Tuple 0.0 0.0] <|> sampleNormed) <#> \freqs ->
                    let
                      segmented = segment 6 9 $ freqs <#> uncurry \i -> (_ / (32.0 - i * 24.0))
                    in D.D := drawArms (distr (join Tuple segmented))
                , D.FillOpacity !:= ".91"
                , D.Stroke !:= if useStroke then "url(#linearGradientArm)" else "none"
                , D.StrokeWidth !:= "0.6"
                , D.Filter !:= if useFilter then "url(#filter17837)" else "none"
                ]
            ]
          ]
      , D.svg
          (oneOf
            [ D.Width !:= show (padding + size + padding)
            , D.Height !:= show (padding + size + padding)
            , D.ViewBox !:= maybe mempty (intercalateMap " " show) (NEA.fromArray [-radius-padding, -radius-padding, size+padding+padding, size+padding+padding])
            , (pure Nothing <|> event) <#> \e ->
                D.OnClick := case e of
                  Just x -> x *> push Nothing
                  _ -> run2_ [ Oc.analyser_ { cb: AnalyserNodeCb \v -> analyserE.push Nothing <$ analyserE.push (Just v), fftSize: TTT8 } $ [ Oc.playBuf pizzs1 bangOn ] ]
                         >>= Just >>> push
            ]
          )
          [ D.defs_
            [ D.linearGradient
              (oneOf
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
            (oneOf
              [ D.Fill !:= "#bfe6ff"
              , D.StrokeLinecap !:= "butt"
              , D.StrokeLinejoin !:= "miter"
              , D.StrokeOpacity !:= "1"
              , rotating <#> \angle ->
                  D.Transform := "rotate(" <> show (Int.round $ ((angle + 30.0) % if rotateGrad then 360.0 else 60.0) - 30.0) <> ")"
              ]
            ) $ join
            let v = 3.0 in
            let vs = [1.0,v,v,6.0,4.0,4.0,5.0,v,1.0] in
            let vss = join Tuple vs in
            [ pure $ flip D.path [] $ oneOf
                [ D.D !:= drawArms [vss, vss, vss, vss, vss, vss]
                , D.FillOpacity !:= ".91"
                , D.Stroke !:= if useStroke then "url(#linearGradientArm)" else "none"
                , D.StrokeWidth !:= "0.6"
                , D.Filter !:= if useFilter then "url(#filter17837)" else "none"
                ]
            ]
          ]
      ]
