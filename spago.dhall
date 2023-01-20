{ name = "snowflow"
, dependencies =
  [ "aff"
  , "arraybuffer"
  , "arrays"
  , "bifunctors"
  , "bolson"
  , "console"
  , "control"
  , "css"
  , "datetime"
  , "debug"
  , "deku"
  , "effect"
  , "either"
  , "exceptions"
  , "foldable-traversable"
  , "hyrule"
  , "integers"
  , "js-timers"
  , "lists"
  , "maybe"
  , "newtype"
  , "nonempty"
  , "numbers"
  , "ocarina"
  , "ordered-collections"
  , "partial"
  , "prelude"
  , "profunctor"
  , "profunctor-lenses"
  , "qualified-do"
  , "record"
  , "refs"
  , "st"
  , "strings"
  , "these"
  , "transformers"
  , "tuples"
  , "uint"
  , "unsafe-coerce"
  , "variant"
  , "web-dom"
  , "web-events"
  , "web-html"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
