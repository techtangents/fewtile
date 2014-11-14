module Techtangents.Fewtile.Mashing.Diff where

import Data.Map (alter, fromList, toList, Map(..))
import Data.Foldable (foldlArray)
import Data.Maybe
import Data.Tuple
import Data.Tuple.Nested

import qualified Techtangents.Fewtile.Struct.Op as Op

type Muple v = Tuple (Maybe v) (Maybe v)

setRight :: forall v. v -> Maybe (Muple v) -> Maybe (Muple v)
setRight v m = Just ((maybe Nothing fst m) /\ Just v)

addRights :: forall k v. (Ord k) => (v -> k) -> Map k (Muple v) -> [v] -> Map k (Muple v)
addRights indexer =
  foldlArray (\acc r -> alter (setRight r) (indexer r) acc)

outerJoin :: forall a b. (Ord b) => (a -> b) -> [a] -> [a] -> [Tuple b (Muple a)]
outerJoin indexer lefts rights =
  let
    m = fromList $ (\x -> indexer x /\ Just x /\ Nothing) <$> lefts
  in
    toList (addRights indexer m rights)

diff :: forall k v. (Eq v, Ord k) => (v -> k) -> [v] -> [v] -> [Op.Op k v]
diff indexer olds nus =
  let
    m = outerJoin indexer olds nus
  in
    do
      Tuple k v <- m
      z <- case v of
             Tuple (Just old) (Just nu) -> if (old == nu) then [] else [Op.Change k old nu]
             Tuple (Just old) Nothing   -> [Op.Remove k old]
             Tuple Nothing (Just nu)    -> [Op.Add k nu]
             Tuple Nothing Nothing      -> []
      return z
