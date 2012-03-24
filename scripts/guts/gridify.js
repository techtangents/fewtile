define(['guts/comparison', 'guts/griddle'], function(comparison, griddle) {
  var arrayMin = comparison.arrayMin;
  var by = comparison.by;

  return function(aspectRatio) {
    return function(totalWidth, totalHeight, numCells) {
      var r = _.range(1, numCells + 1);
      var g = griddle(totalWidth, totalHeight, numCells);
      var layouts = _.map(r, g);

      var deltaAr = function(x) {
        return Math.abs(x.meanAr - aspectRatio);
      };

      return arrayMin(by(deltaAr))(layouts);
    };
  };
});