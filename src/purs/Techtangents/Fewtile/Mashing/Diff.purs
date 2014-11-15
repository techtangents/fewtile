module Techtangents.Fewtile.Mashing.Diff (diff) where

import Data.Map (alter, fromList, toList, Map(..))
import Data.Foldable (foldlArray)
import Data.Maybe
import Data.Tuple
import Data.Tuple.Nested

import qualified Techtangents.Fewtile.Struct.Op as Op

outerJoin :: forall k v. (Ord k) => (v -> k) -> [v] -> [v] -> [Tuple k (Tuple (Maybe v) (Maybe v))]
outerJoin indexer lefts rights =
  let
    mlefts = fromList $ (\x -> indexer x /\ Just x /\ Nothing) <$> lefts
    setRight v m = Just $ (m >>= fst) /\ Just v
  in
    toList $ foldlArray (\acc r -> alter (setRight r) (indexer r) acc) mlefts rights

diff :: forall k v. (Eq v, Ord k) => (v -> k) -> [v] -> [v] -> [Op.Op k v]
diff indexer olds nus =
  let m = outerJoin indexer olds nus
  in do
       Tuple k v <- m
       case v of
         Tuple (Just old) (Just nu) -> if (old == nu) then [] else [Op.Change k old nu]
         Tuple (Just old) Nothing   -> [Op.Remove k old]
         Tuple Nothing (Just nu)    -> [Op.Add k nu]
         Tuple Nothing Nothing      -> []
