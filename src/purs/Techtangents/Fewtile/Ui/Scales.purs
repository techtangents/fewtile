module Techtangents.Fewtile.Ui.Scales where

import Data.Array (length, sortBy)
import Data.Foldable (foldlArray)
import Data.Tuple
import Data.Map
import Data.Maybe

import Techtangents.Fewtile.Mashing.Arrays (sum)
import Techtangents.Fewtile.Struct.Tile

groupBy :: forall a k. (Ord k) => (a -> k) -> [a] -> [Tuple k [a]]
groupBy indexer =
  toList <<< (foldlArray (\m x -> alter (\mxs -> Just (x : fromMaybe [] mxs)) (indexer x) m) empty)

type Group = {weight :: Number, totalWeight :: Number, tiles :: [Tile]}

groupByWeight :: [Tile] -> [Group]
groupByWeight tiles =
  let
    groups = groupBy (\(Tile t) -> t.weight) tiles
    f (Tuple weight members) =
      { weight: weight
      , totalWeight: weight * (length members)
      , tiles: members
      }
    grizzoups = f <$> groups
  in
    sortBy (\a b -> compare b.weight a.weight) grizzoups

globalWeight :: [Group] -> Number
globalWeight groups =
  sum $ (\g -> g.totalWeight) <$> groups

groupHeight :: Group -> Number -> Number -> Number
groupHeight group globalWeight totalHeight =
  group.totalWeight / globalWeight * totalHeight
