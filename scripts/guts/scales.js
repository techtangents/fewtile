define(['guts/util', 'underscore'], function(util, _) {
  var groupBy = util.groupBy;
  var prop = util.prop;
  var map = _.map;

  // :: [tile] -> [{weight: int, totalWeight: int, tiles: [tile]}]
  var groupByWeight = function(tiles) {
    var grouped = groupBy(prop('weight'), tiles);
    return _.map(grouped, function(group) {
      var w = Number(group.key);
      var n = group.members.length;
      return {
        weight: w,
        groupWeight: w * n,
        tiles: group.members
      };
    });
  };

  var globalWeight = function(groups) {
    return arraySum(map(groups, prop('groupWeight')));
  };

  var allocateWeightToGroup = function(groupWeight, globalWeight, totalWidth, totalHeight) {
    return {
      width: totalWidth // yep, we split into rows
      height: groupWeight / globalWeight * totalHeight
    };
  };

  return {
    groupByWeight: groupByWeight,
    globalWeight: globalWeight,
    allocateWeightToGroup: allocateWeightToGroup
  };
});