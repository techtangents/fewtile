module Techtangents.Fewtile.Ui.Layout where

-- TODO Can I use Data.Array.groupBy instead?
import Data.Array hiding (groupBy)
import Data.Tuple
import Data.Traversable
import Control.Monad.State
import Control.Monad.State.Class

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



layoutCellsForGroup :: (Tuple Group Rect) -> [Rect]
layoutCellsForGroup (Tuple (Group group) (Rect rect)) =
  let
    g = gridify aspectRatio rect.width rect.height (length group.tiles)

    z :: Number
    z = 3
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
