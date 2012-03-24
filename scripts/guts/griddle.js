define(['guts/util'], function(util) {
  return function(totalWidth, totalHeight, numCells) {
    return function(rows) {
      var normalCols = Math.floor(numCells / rows);
      var skinnyCols = normalCols + 1;

      var skinnyRows = numCells % rows;
      var normalRows = rows - skinnyRows;
      
      var height = totalHeight / rows;

      var f = function(r, c) {
        var cells = r * c;
        var width = totalWidth / c;
        var ar = width / height;

        return {
          rows: r,
          cols: c,
          cells: cells,
          width: width,
          height: height,
          ar: ar
        };
      };

      var normal = f(normalRows, normalCols);
      var rowLayouts = skinnyRows === 0 ? [normal] : [normal, f(skinnyRows, skinnyCols)];

      var sumArs = util.arraySum(_.map(rowLayouts, function(r) {
        return r.ar * r.cells;
      }));

      var meanAr = sumArs / numCells;

      return {
        rows: rows,
        cells: numCells,
        rowLayouts: rowLayouts,
        meanAr: meanAr
      };
    };
  };
});