{ name = "snowflow"
, dependencies =
  [ "aff"
  , "arraybuffer"
  , "arrays"
  , "bifunctors"
  , "console"
  , "control"
  , "datetime"
  , "deku"
  , "effect"
  , "foldable-traversable"
  , "hyrule"
  , "integers"
  , "maybe"
  , "newtype"
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
