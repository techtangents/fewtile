module Techtangents.Fewtile.Mashing.Arrays where

import Data.Foldable (foldlArray)

sum :: [Number] -> Number
sum = foldlArray (+) 0
