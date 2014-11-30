module Techtangents.Fewtile.Ui.Layout where

import Control.Bind (join)
import Control.Monad.State
import Control.Monad.State.Class

import Optic.Refractor.Lens (_2)
import Optic.Setter (set)

-- TODO Can I use Data.Array.groupBy instead?
import Data.Array hiding (groupBy)
import Data.Bifunctor (lmap, rmap)
import Data.Tuple
import Data.Traversable

import Techtangents.Fewtile.Struct.Group
import Techtangents.Fewtile.Ui.Scales
import Techtangents.Fewtile.Ui.Gridify
import Techtangents.Fewtile.Struct.Rect
import Techtangents.Fewtile.Struct.Tile
import Techtangents.Fewtile.Struct.Shingle

-- TODO: this will be in a new version of purescript-foldable-traversable
mapAccumL :: forall a b c t. (Traversable t) => (a -> b -> Tuple c a) -> a -> t b -> Tuple (t c) a
mapAccumL f s t =
  runState (traverse (state <<< (flip f)) t) s


border = 10

-- var arraySort = comparison.arraySort;
-- var by = comparison.by;
-- var prop = util.prop;
-- var reverse = comparison.reverse;

-- // TODO: quantize to pixels
aspectRatio = 7 / 3

layoutGroups :: Number -> Number -> [Group] -> [Rect]
layoutGroups totalWidth totalHeight groups =
  let
    gw = globalWeight groups
    f y g =
      let height = groupHeight g gw totalHeight
          y' = y + height
          l = Rect {x: 0, y: y, width: totalWidth, height: height}
      in
        Tuple l y'
  in
    fst $ mapAccumL f 0 groups

-- TODO: Should be in Data.Array
replicate :: forall a. Number -> a -> [a]
replicate n x =
  if (n > 0)
    then (const x) <$> (1..n)
    else []

layoutCellsForGroup :: (Tuple Group Rect) -> [Rect]
layoutCellsForGroup (Tuple (Group group) (Rect rect)) =
  let
    grid = gridify aspectRatio rect.width rect.height (length group.tiles)
    g = case grid of (GridSpec g) -> g

    makeRow :: Number -> Number -> RowSpec -> (Tuple [Rect] Number)
    makeRow x y (RowSpec r) =
      let
        y' = y + r.height
        gen = replicate r.cols unit
        f x _ = Tuple (Rect {x: x, y: y, width: r.width, height: r.height}) (x + r.width)
      in
        set _2 y' (mapAccumL f x gen)

    dspecs :: [RowSpec]
    dspecs = g.rowSpecs >>= \rr -> case rr of (RowSpec r) -> replicate r.rows rr

  in
    join <<< fst $ mapAccumL (makeRow rect.x) rect.y dspecs

-- TODO: Is this right?
borderize :: Rect -> Rect
borderize (Rect r) =
  Rect r
    { width  = r.width  - 2 * border
    , height = r.height - 2 * border
    }


layout :: Number -> Number -> [Tile] -> [Shingle]
layout totalWidth totalHeight tiles =
  let
    groups :: [Group]
    groups = groupAndSortByWeight tiles

    groupLayouts :: [Rect]
    groupLayouts = layoutGroups totalWidth totalHeight groups

    groupPairs :: [Tuple Group Rect]
    groupPairs = zip groups groupLayouts

    laidCells :: [Shingle]
    laidCells = join (f <$> groupPairs)

    f :: Tuple Group Rect -> [Shingle]
    f gr@(Tuple (Group g) r) =
      let
        layouts :: [Rect]
        layouts = (borderize <<< quantize) <$> layoutCellsForGroup gr

        gl :: [Tuple Tile Rect]
        gl = zip g.tiles layouts
      in
        (\x -> case x of (Tuple tile rect) -> shingle' tile rect) <$> gl

  in
    laidCells