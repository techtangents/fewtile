module Techtangents.Fewtile.Ui.Layout where

import Control.Bind (join)
import Control.Monad.State
import Control.Monad.State.Class
import Control.Lens (set, _2)

-- TODO Can I use Data.Array.groupBy instead?
import Data.Array hiding (groupBy)
import Data.Bifunctor (lmap, rmap)
import Data.Tuple
import Data.Traversable

import Techtangents.Fewtile.Struct.Group
import Techtangents.Fewtile.Ui.Scales
import Techtangents.Fewtile.Ui.Gridify
import Techtangents.Fewtile.Struct.Rect

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
    grid :: GridSpec
    grid = gridify aspectRatio rect.width rect.height (length group.tiles)

    makeRow :: Number -> Number -> RowSpec -> (Tuple [Rect] Number)
    makeRow x y (RowSpec r) =
      set _2 y' (mapAccumL f x gen)
      where
        y' = y + r.height
        gen = replicate r.cols unit
        f x _ = Tuple (Rect {x: x, y: y, width: r.width, height: r.height}) (x + r.width)

    makeRowz :: Number -> Number -> [RowSpec] -> (Tuple [Rect] Number)
    makeRowz x y specs =
      lmap join (mapAccumL (makeRow x) y dspecs)
      where
        dspecs = specs >>= \rr -> case rr of (RowSpec r) -> replicate r.rows rr

    -- makeAll :: GridSpec -> (Tuple [Rect] Number)
    -- makeAll (GridSpec gs) =
    --   join . fst $ (mapAccumL makeRowz y )

  in
    []
    -- cells =
    --   fst $ mapAccumL f rect.y grid.rowLayouts
    --   where
    --     f y rl = mapAccumL g y rl
    --     where
    --       g y rl = mapAccumL h




--   var y = group.pos.y;
--   _.each(grid.rowLayouts, function(rowLayout) {
--     for (var row = 0; row < rowLayout.rows; row++) {
--       var x = group.pos.x;
--       for (var col = 0; col < rowLayout.cols; col++) {
--         var t = {
--           pos: {
--             x: x,
--               y: y
--           },
--           size: util.narrow(rowLayout, ['width', 'height'])
--         };
--         r.push(t);
--         x += rowLayout.width;
--       }
--       y += rowLayout.height;
--     }
--   });
--   return r;
-- };

-- var sortGroups = arraySort(reverse(by(prop('weight'))));

-- var borderize = function(tile) {
--   return {
--     pos: tile.pos,
--     size: size.bimap(tile.size, function(x) { return x - 2 * border; })
--   };
-- };

-- var layout = function(totalWidth, totalHeight, tiles) {
--   var groups = sortGroups(scales.groupByWeight(tiles));
--   var groupLayouts = layoutGroups(totalWidth, totalHeight, groups);
--   var groups_ = util.submerge(groups, groupLayouts);
--   var laidCells = _.map(groups_, function(g) {
--     var layouts = _.map(
--       layoutCellsForGroup(g),
--       _.compose(borderize, quantize));
--     return _.map(
--       util.zip(g.tiles, layouts),
--       function(tl) { return shingle.nu(tl.a, tl.b); });
--   });
--   return _.flatten(laidCells, 1);
-- };

-- return {
--   layoutGroups: layoutGroups,
--   layoutCellsForGroup: layoutCellsForGroup,
--   layout: layout
-- };
