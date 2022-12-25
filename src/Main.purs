module Main where

import Prelude

import Control.Plus (empty)
import Data.Array as Array
import Data.Array.NonEmpty as NEA
import Data.Bifunctor (class Bifunctor, bimap, lmap, rmap)
import Data.DateTime.Instant (unInstant)
import Data.Foldable (length, oneOf)
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Int as Int
import Data.Maybe (maybe)
import Data.Newtype (unwrap)
import Data.Number ((%))
import Data.Number as Math
import Data.Semigroup.Foldable (intercalateMap)
import Data.Tuple (Tuple(..))
import Deku.Attribute ((!:=), (:=), (<:=>))
import Deku.Control as DC
import Deku.DOM as D
import Deku.Pursx ((~~))
import Deku.Toplevel as Deku
import Effect (Effect)
import Effect.Console (log)
import FRP.Event (keepLatest)
import FRP.Event.Time (interval)
import Partial.Unsafe (unsafeCrashWith)
import Type.Proxy (Proxy(..))

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

skew = (_ / Math.sqrt 3.0)
unskew = (_ * Math.sqrt 3.0)
skew2 = (_ / Math.sqrt 3.0) >>> (_ * 2.0)
skewY v = Tuple v (skew v)
skewY2 v = Tuple v (skew2 v)
incr i v = Int.toNumber i * v
prefix p ps = Array.cons p (add p <$> ps)
prepostfix p0 pn ps = Array.snoc (prefix p0 ps) pn

line (Tuple x1 y1) (Tuple x2 y2) =
  oneOf
    [ D.X1 !:= show x1
    , D.X2 !:= show x2
    , D.Y1 !:= show y1
    , D.Y2 !:= show y2
    ]

main :: Effect Unit
main = do
  let
    size = 100.0
    radius = size / 2.0
    padding = 5.0
    center = 0.0

    armWidth = 2.0
    tineWidth = 4.1
    tineSkip = 1.0

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
        drawTines widths1 <> Array.reverse (lmap negate <$> drawTines widths2)
    drawArms =
      toPath <<< foldMapWithIndex \i -> drawArm (incr i 60.0)

    rotating = interval (Int.round (1000.0 / 60.0)) <#> unInstant >>> unwrap >>> \t ->
      t / 1000.0 * 120.0

  Deku.runInBody do
    D.div_ $ join $ Array.replicate 15
      [ D.svg
          (oneOf
            [ D.Width !:= show (padding + size + padding)
            , D.Height !:= show (padding + size + padding)
            , D.ViewBox !:= maybe mempty (intercalateMap " " show) (NEA.fromArray [-radius-padding, -radius-padding, size+padding+padding, size+padding+padding])
            ]
          )
          [ D.defs_
            [ D.linearGradient
              (oneOf
                [ D.Id !:= "linearGradientArm"
                , D.GradientUnits !:= "userSpaceOnUse"
                , keepLatest $ rotating <#> \angle ->
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
                  D.Transform := "rotate(" <> show (Int.round $ ((angle + 30.0) % 60.0) - 30.0) <> ")"
              ]
            ) $ join
            let v = 3.0 in
            let vs = [1.0,v,v,6.0,4.0,4.0,5.0,v,1.0] in
            let vss = join Tuple vs in
            [ pure $ flip D.path [] $ oneOf
                [ D.D !:= drawArms [vss, vss, vss, vss, vss, vss]
                , D.FillOpacity !:= ".91"
                -- , D.Stroke !:= "url(#linearGradientArm)"
                , D.StrokeWidth !:= "0.6"
                -- , D.Filter !:= "url(#filter17837)"
                ]
            ]
          ]
      ]
