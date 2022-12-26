{ name = "snowflow"
, dependencies =
  [ "aff"
  , "arraybuffer"
  , "arrays"
  , "bifunctors"
  , "console"
  , "control"
  , "css"
  , "datetime"
  , "debug"
  , "deku"
  , "effect"
  , "foldable-traversable"
  , "hyrule"
  , "integers"
  , "lists"
  , "maybe"
  , "newtype"
  , "nonempty"
  , "numbers"
  , "ocarina"
  , "partial"
  , "prelude"
  , "tuples"
  , "uint"
  , "unsafe-coerce"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
