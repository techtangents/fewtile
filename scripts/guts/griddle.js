define([], function() {
  return function(totalWidth, totalHeight, numCells) {
    return function(rows) {
      var normalCols = Math.floor(rows / numCells);
      var skinnyCols = normalCols + 1;

      var skinnyRows = rows % numCells;
      var normalRows = rows - skinnyRows;
      
      var height = totalHeight / rows;

      var f = function(r, c) {
        var cells = r * c;
        var width = totalWidth / c;
        var ar = width / height;

        return {
          cells: cells,
          width: width,
          height: height,
          ar: ar
        };
      };

      var normal = f(normalRows, normalCols);
      var skinny = f(skinnyRows, skinnyCols);

      var meanAr = (normal.ar * normal.cells + skinny.ar * skinny.cells) / numCells;

      return {
        rows: rows,
        normal: normal,
        skinny: skinny,
        meanAr: meanAr
      };
    };
  };
});