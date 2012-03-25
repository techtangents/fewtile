define(['guts/scales', 'underscore', 'guts/pos', 'guts/util', 'guts/gridify', 'guts/comparison'], 
  function(scales, _, pos, util, gridify, comparison) {

  var arraySort = comparison.arraySort;
  var by = comparison.by;
  var prop = util.prop;
  var reverse = comparison.reverse;

  // TODO: quantize to pixels
  var aspectRatio = 7/3;

  var layoutGroups = function(totalWidth, totalHeight, groups) {
    var globalWeight = scales.globalWeight(groups);
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
      for (var row = 0; row < rowLayout.rows; row++) {
        var x = group.pos.x;
        for (var col = 0; col < rowLayout.cols; col++) {
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
      }
    });
    return r;
  };

  var sortGroups = arraySort(reverse(by(prop('weight'))));

  var layout = function(totalWidth, totalHeight, tiles) {
    var groups = sortGroups(scales.groupByWeight(tiles));
    var groupLayouts = layoutGroups(totalWidth, totalHeight, groups);
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
    layoutGroups: layoutGroups,
    layoutCellsForGroup: layoutCellsForGroup,
    layout: layout
  };
});
