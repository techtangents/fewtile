define(['guts/comparison', 'guts/util'], function(comparison, util) {
  return function(aspectRatio) {
    return function(totalWidth, totalHeight) {
      return function(numCells) {

        var rows = 
          Math.max(
            1, 
            Math.min(
              numCells, 
              Math.round(
                Math.sqrt( (aspectRatio * totalHeight * numCells) / totalWidth))));

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
  };
});