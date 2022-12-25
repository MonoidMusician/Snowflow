{ name = "snowflow"
, dependencies =
  [ "arrays"
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
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
