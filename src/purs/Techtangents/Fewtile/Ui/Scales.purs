module Techtangents.Fewtile.Ui.Scales where

import Data.Array (length, sortBy)
import Data.Foldable (foldlArray, sum)
import Data.Tuple
import Data.Map
import Data.Maybe

import Techtangents.Fewtile.Struct.Tile
import Techtangents.Fewtile.Struct.Group

groupBy :: forall a k. (Ord k) => (a -> k) -> [a] -> [Tuple k [a]]
groupBy indexer =
  toList <<< (foldlArray (\m x -> alter (\mxs -> Just (x : fromMaybe [] mxs)) (indexer x) m) empty)

groupAndSortByWeight :: [Tile] -> [Group]
groupAndSortByWeight tiles =
  let
    groups = groupBy (\(Tile t) -> t.weight) tiles
    f (Tuple weight members) =
      Group { weight: weight
            , totalWeight: weight * (length members)
            , tiles: members
            }
    grizzoups = f <$> groups
  in
    sortBy (\(Group a) (Group b) -> compare b.weight a.weight) grizzoups

globalWeight :: [Group] -> Number
globalWeight groups =
  sum $ (\(Group g) -> g.totalWeight) <$> groups

groupHeight :: Group -> Number -> Number -> Number
groupHeight (Group g) globalWeight totalHeight =
  g.totalWeight / globalWeight * totalHeight
