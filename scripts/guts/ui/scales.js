define(['guts/mashing/util', 'underscore'], function(util, _) {
  var groupBy = util.groupBy;
  var prop = util.prop;
  var map = _.map;
  var arraySum = util.arraySum;

  // :: [tile] -> [{weight: int, totalWeight: int, tiles: [tile]}]
  // TODO: sort by weight descendings
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

  // split into rows
  var groupHeight = function(groupWeight, globalWeight, totalHeight) {
    return groupWeight / globalWeight * totalHeight;
  };

  return {
    groupByWeight: groupByWeight,
    globalWeight: globalWeight,
    groupHeight: groupHeight
  };
});