module Techtangents.Fewtile.Struct.Group where

import Techtangents.Fewtile.Struct.Tile

newtype Group = Group {weight :: Number, totalWeight :: Number, tiles :: [Tile]}
