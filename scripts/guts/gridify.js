define(['guts/comparison', 'guts/griddle'], function(comparison, griddle) {

  var exhaustive = function(aspectRatio) {
    return function(totalWidth, totalHeight) {
      return function(numCells) {
        var arrayMin = comparison.arrayMin;
        var by = comparison.by;

        var r = _.range(1, numCells + 1);
        var g = griddle(totalWidth, totalHeight, numCells);
        var layouts = _.map(r, g);
        var deltaAr = function(x) {
          return Math.abs(x.meanAr - aspectRatio);
        };
        return arrayMin(by(deltaAr))(layouts);
      };
    };
  };

  var quick = function(aspectRatio) {
    return function(totalWidth, totalHeight) {
      return function(numCells) {
        var rows = Math.round(Math.sqrt( (aspectRatio * totalHeight * numCells) / totalWidth));
        var rows_ = Math.max(1, Math.min(numCells, rows));
        return griddle(totalWidth, totalHeight, numCells)(rows_);
      };
    };
  };

  return {
    exhaustive: exhaustive,
    quick: quick
  };
});