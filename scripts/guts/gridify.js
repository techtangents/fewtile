define(['guts/comparison', 'guts/griddle'], function(comparison, griddle) {
  return function(aspectRatio) {
    return function(totalWidth, totalHeight) {
      return function(numCells) {
        var rows = Math.round(Math.sqrt( (aspectRatio * totalHeight * numCells) / totalWidth));
        var rows_ = Math.max(1, Math.min(numCells, rows));
        return griddle(totalWidth, totalHeight, numCells)(rows_);
      };
    };
  };
});