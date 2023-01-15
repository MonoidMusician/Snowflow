module Snowflow.Assets where

import Prelude

import Data.Array as Array
import Data.Int as Int
import Debug (spyWith)
import Record as Record

foreign import main0Url :: String
foreign import pizzs1Url :: String

foreign import melody1Url :: String
foreign import melody2Url :: String
foreign import melody3Url :: String
foreign import melody4Url :: String
foreign import melody5Url :: String

foreign import chord1Url :: String
foreign import chord2Url :: String
foreign import chord3Url :: String
foreign import chord4Url :: String
foreign import chord5Url :: String
foreign import chord6Url :: String
foreign import chord7Url :: String
foreign import chord8Url :: String
foreign import chord9Url :: String
foreign import chord10Url :: String
foreign import chord11Url :: String
foreign import chord12Url :: String
foreign import chord13Url :: String
foreign import chord14Url :: String
foreign import chord15Url :: String
foreign import chord16Url :: String
foreign import chord17Url :: String
foreign import chord18Url :: String
foreign import chord19Url :: String
foreign import chord20Url :: String
foreign import chord21Url :: String
foreign import chord22Url :: String
foreign import chord23Url :: String
foreign import chord24Url :: String
foreign import chord25Url :: String
foreign import chord26Url :: String
foreign import chord27Url :: String
foreign import chord28Url :: String
foreign import chord29Url :: String
foreign import chord30Url :: String
foreign import chord31Url :: String
foreign import chord32Url :: String
foreign import chord33Url :: String
foreign import chord34Url :: String
foreign import chord35Url :: String
foreign import chord36Url :: String
foreign import chord37Url :: String
foreign import chord38Url :: String
foreign import chord39Url :: String
foreign import chord40Url :: String
foreign import chord41Url :: String
foreign import chord42Url :: String
foreign import chord43Url :: String
foreign import chord44Url :: String
foreign import chord45Url :: String
foreign import chord46Url :: String
foreign import chord47Url :: String
foreign import chord48Url :: String
foreign import chord49Url :: String
foreign import chord50Url :: String
foreign import chord51Url :: String
foreign import chord52Url :: String
foreign import chord53Url :: String
foreign import chord54Url :: String
foreign import chord55Url :: String
foreign import chord56Url :: String
foreign import chord57Url :: String
foreign import chord58Url :: String
foreign import chord59Url :: String
foreign import chord60Url :: String

samples :: Int -> Number
samples = Int.toNumber >>> (_ / 48000.0)

sections :: Array
  { startTime :: Number
  , length :: Number
  , file :: String
  , chords :: Array
    { startTime :: Number
    , startNorm :: Number
    , file :: String
    , name :: String
    }
  }
sections = Array.mapWithIndex segmentChords
  [ { startTime: samples 86032
    , length: samples 1817722
    , file: melody1Url
    , chords: []
    }
  , { startTime: samples 1884793
    , length: samples 1529519
    , file: melody2Url
    , chords: []
    }
  , { startTime: samples 3351179
    , length: samples 1296384
    , file: melody3Url
    , chords: []
    }
  , { startTime: samples 4630967
    , length: samples 941184
    , file: melody4Url
    , chords: []
    }
  , { startTime: samples 5540535
    , length: samples 1305894
    , file: melody5Url
    , chords: []
    }
  ]
  where
  segmentChords i r = r { chords = _ } $
    map (\c -> Record.merge { startNorm: (c.startTime - r.startTime) / r.length } c) $
      chords # Array.filter \c ->
        (c.startTime == 0.0 && i == 0) ||
        (c.startTime >= r.startTime && c.startTime <= r.startTime + r.length)

chords :: Array
  { startTime :: Number
  , file :: String
  , name :: String
  }
chords =
  Array.zipWith Record.merge chordInfo ({ startTime: _ } <$> chordTiming)
  where
  chordInfo = spyWith "chordInfo" Array.length $ (\cs -> Array.take 20 cs <> Array.take 15 cs <> Array.drop 20 cs)
    [ { file: chord1Url
      , name: "E min"
      }
    , { file: chord2Url
      , name: ""
      }
    , { file: chord3Url
      , name: ""
      }
    , { file: chord4Url
      , name: ""
      }
    , { file: chord5Url
      , name: ""
      }
    , { file: chord6Url
      , name: ""
      }
    , { file: chord7Url
      , name: ""
      }
    , { file: chord8Url
      , name: ""
      }
    , { file: chord9Url
      , name: ""
      }
    , { file: chord10Url
      , name: ""
      }
    , { file: chord11Url
      , name: ""
      }
    , { file: chord12Url
      , name: ""
      }
    , { file: chord13Url
      , name: ""
      }
    , { file: chord14Url
      , name: ""
      }
    , { file: chord15Url
      , name: ""
      }
    , { file: chord16Url
      , name: ""
      }
    , { file: chord17Url
      , name: ""
      }
    , { file: chord18Url
      , name: ""
      }
    , { file: chord19Url
      , name: ""
      }
    , { file: chord20Url
      , name: ""
      }
    , { file: chord21Url
      , name: ""
      }
    , { file: chord22Url
      , name: ""
      }
    , { file: chord23Url
      , name: ""
      }
    , { file: chord24Url
      , name: ""
      }
    , { file: chord25Url
      , name: ""
      }
    , { file: chord26Url
      , name: ""
      }
    , { file: chord27Url
      , name: ""
      }
    , { file: chord28Url
      , name: ""
      }
    , { file: chord29Url
      , name: ""
      }
    , { file: chord30Url
      , name: ""
      }
    , { file: chord31Url
      , name: ""
      }
    , { file: chord32Url
      , name: ""
      }
    , { file: chord33Url
      , name: ""
      }
    , { file: chord34Url
      , name: ""
      }
    , { file: chord35Url
      , name: ""
      }
    , { file: chord36Url
      , name: ""
      }
    , { file: chord37Url
      , name: ""
      }
    , { file: chord38Url
      , name: ""
      }
    , { file: chord39Url
      , name: ""
      }
    , { file: chord40Url
      , name: ""
      }
    , { file: chord41Url
      , name: ""
      }
    , { file: chord42Url
      , name: ""
      }
    , { file: chord43Url
      , name: ""
      }
    , { file: chord44Url
      , name: ""
      }
    , { file: chord45Url
      , name: ""
      }
    , { file: chord46Url
      , name: ""
      }
    , { file: chord47Url
      , name: ""
      }
    , { file: chord48Url
      , name: ""
      }
    , { file: chord49Url
      , name: ""
      }
    , { file: chord50Url
      , name: ""
      }
    , { file: chord51Url
      , name: ""
      }
    , { file: chord52Url
      , name: ""
      }
    , { file: chord53Url
      , name: ""
      }
    , { file: chord54Url
      , name: ""
      }
    , { file: chord55Url
      , name: ""
      }
    , { file: chord56Url
      , name: ""
      }
    , { file: chord57Url
      , name: ""
      }
    , { file: chord58Url
      , name: ""
      }
    , { file: chord59Url
      , name: ""
      }
    , { file: chord60Url
      , name: ""
      }
    ]

chordTiming :: Array Number
chordTiming = spyWith "length" Array.length
  [
    0.0,
    3.5818333333333334,
    6.6275,
    8.413833333333333,
    9.343166666666667,
    10.3085,
    13.3005,
    14.725833333333334,
    16.6965,
    19.629833333333334,
    21.269833333333334,
    23.0085,
    24.747166666666665,
    26.4685,
    28.2485,
    30.327166666666667,
    31.8805,
    32.64183333333333,
    33.50716666666667,
    34.99916666666667,
    37.033833333333334,
    40.5205,
    43.83116666666667,
    45.591166666666666,
    46.4925,
    47.3485,
    50.249833333333335,
    52.0685,
    53.7285,
    56.875166666666665,
    58.2485,
    59.847166666666666,
    61.773833333333336,
    63.6965,
    65.75116666666666,
    67.96316666666667,
    69.446,
    70.77525,
    72.2925,
    73.85516666666666,
    75.52983333333333,
    79.81516666666667,
    85.63516666666666,
    87.2085,
    91.74183333333333,
    93.248,
    94.71116666666667,
    96.07383333333334,
    97.51783333333333,
    99.27783333333333,
    100.87116666666667,
    103.6325,
    105.1285,
    106.53916666666667,
    108.227,
    109.93783333333333,
    110.72983333333333,
    111.64316666666667,
    113.2805,
    114.71916666666667,
    115.59666666666666,
    116.42316666666666,
    118.57116666666667,
    120.105,
    123.66175,
    125.25775,
    126.84975,
    127.739,
    128.585,
    129.5595,
    130.336,
    131.12625,
    131.941625,
    133.04020833333334,
    134.69616666666667
  ]
