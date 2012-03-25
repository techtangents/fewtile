define(['guts/scales', 'underscore', 'guts/pos', 'guts/util', 'guts/gridify'], 
  function(scales, _, pos, util, gridify) {

  // TODO: quantize to pixels
  var aspectRatio = 7/3;

  var layoutGroups = function(totalWidth, totalHeight, globalWeight, groups) {
    var y = 0;
    var groupLayouts = [];
    _.each(groups, function(g) {
      var height = scales.groupHeight(g.groupWeight, globalWeight, totalHeight);
      var l = {
        pos: {
          x: 0,
          y: y
        },
        size: {
          width: totalWidth,
          height: height
        }
      };
      groupLayouts.push(l);
      y += height;
    });
    return groupLayouts;
  };

  var layoutCellsForGroup = function(group) {
    //aspectRatio, totalWidth, totalHeight, numCells
    var grid = gridify(aspectRatio, group.size.width, group.size.height, group.tiles.length);
    var r = [];
    var y = group.pos.y;
    _.each(grid.rowLayouts, function(rowLayout) {
      var x = group.pos.x;
      for (var i = 0; i < rowLayout.cols; i++) {
        var t = {
          pos: {
            x: x,
            y: y
          },
          size: {
            width: rowLayout.width,
            height: rowLayout.height
          }
        };
        r.push(t);
        x += rowLayout.width;
      }
      y += rowLayout.height;
    });
    return r;
  };

  var layout = function(totalWidth, totalHeight, tiles) {
    var groups = scales.groupByWeight(tiles);
    var globalWeight = scales.globalWeight(groups);
    var groupLayouts = layoutGroups(totalWidth, totalHeight, globalWeight, groups);
    var groups_ = util.submerge(groups, groupLayouts);
    var laidCells = _.map(groups_, function(g) {
      var l = layoutCellsForGroup(g);
      var sm = util.submerge(g.tiles, l);
      return _.map(sm, function(t) {
        return util.narrow(t, ['text', 'cssClass', 'pos', 'size']);
      });
    });
    return _.flatten(laidCells, 1);
  };

  return {
    layout: layout
  };
});
