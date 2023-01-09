module Snowflow.Test where

import Prelude

import Control.Alt ((<|>))
import Data.Maybe (Maybe(..))
import Data.Set as Set
import Data.Tuple (Tuple(..))
import Debug (spy, traceM)
import Deku.Attribute ((<:=>))
import Deku.Control (text_)
import Deku.DOM as D
import Deku.Hooks (useState)
import Deku.Toplevel (runInBody)
import Effect (Effect)
import Effect.Exception (throw)
import Effect.Ref as Ref
import FRP.Event (Event, create, mailboxed)
import FRP.Event as Event
import Ocarina.Control as Oc
import Ocarina.Core (Audible, AudibleChild, bangOn)
import Ocarina.Core as OC
import Ocarina.Core as Ocarina
import Ocarina.Run (run2_)

unsafeUnbang :: forall a. Event a -> Effect a
unsafeUnbang e = do
  ref <- Ref.new Nothing
  join $ Event.subscribe e (flip Ref.write ref <<< Just)
  Ref.read ref >>= case _ of
    Nothing -> throw "unsafeUnbang failed"
    Just v -> pure v

newTest :: forall k a. Ord k =>
  Effect
    { push :: k -> a -> Effect Unit
    , added :: Event (Event a)
    }
newTest = do
  seen <- Ref.new Set.empty
  added <- create
  bus <- create
  mailbox <- unsafeUnbang $ mailboxed bus.event identity
  pure
    { push: \address payload -> do
        traceM { address, payload }
        bus.push { address, payload }
        seenSoFar <- Ref.read seen
        -- We fire added afterwards, since if we push to the bus it won't
        -- register until Bolson processes the node anyways
        when (not Set.member address seenSoFar) do
          Ref.write (Set.insert address seenSoFar) seen
          added.push { address, payload }
    , added: added.event <#> \{ address, payload } ->
        -- Using `mailboxed` like this doesn't work??
        pure payload <|> map (spy "this never fires") (mailbox address)
        -- The equivalent `filterMap` works fine (but see not below):
        -- pure payload <|> filterMap (spy "filtering" >>> \r -> if r.address == address then Just r.payload else Nothing) bus.event
    }

ocarinaTest :: forall r outputChannels lock payload. { added :: Event (Event Boolean) | r } -> Audible outputChannels lock payload
ocarinaTest { added } =
  Ocarina.dyn $ map (emitSound <<< spy "emitSound") <$> added
  where
  -- Regardless of the above:
  -- It never processes a second `OC.sound`? is that to be expected?
  emitSound :: Boolean -> AudibleChild outputChannels lock payload
  emitSound false = OC.silence -- OC.sound $ Oc.sinOsc 220.0 bangOn
  emitSound true = OC.sound $ Oc.sinOsc 440.0 bangOn

main :: Effect Unit
main = do
  test <- newTest
  started <- Ref.new false
  let
    once = whenM (not <$> Ref.read started) do
      void $ run2_ [ Oc.gain_ 0.15 [ ocarinaTest test ] ]
  runInBody
    let
      btn k =
        useState false \(Tuple setState lastState) ->
          D.button
            (D.OnClick <:=> do
              lastState <#> spy "lastState" >>> not >>> \v -> do
                setState v
                once
                test.push k v
            )
            [ text_ k ]
    in D.div_
      [ text_ "Toggle oscillators: "
      , btn "One"
      , btn "Two"
      ]
