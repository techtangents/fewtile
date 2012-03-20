var board2 = (function() {

  var aspectRatio = 5 / 3;

  //  tallyWeights :: [{weight}] -> [{weight: nat, tally: nat}]
  var tallyWeights = function(tiles) {
    var weights = {};
    _.each(tiles, function(tile)) {
      weights[tile.weight] = numberOrZero(weights[tile.weight]) + 1;      
    });

    var r = [];
    _.each(weights, function(weight, tally) {
      r.push({weight: Number(weight), tally: tally});
    });
    return r;
  };

  // totalWeight :: [{weight: nat}] -> nat
  var totalWeight = function(weights) {
    var ws = _.map(weights, util.prop("weight"));
    return _.reduceRight(ws, plus, 0); 
  };

  // allocWeights :: ([{weight: nat, tally: nat}], nat, nat) -> [{weight: nat, area: nat}] 
  var allocWeights = function(weights, totalWeight, totalSize) {
    var r = [];
    var consumedLogical = 0;
    var consumedPhysical = 0;
    _.each(weights, function(x, i) {
      if (i === x.length - 1) {
        r.push({weight: w, area: totalSize - consumedPhysical});
      } else {
        var w = x.weight;
        var t = x.tally;
        var logical = (w / totalWeight) * totalArea;
        var newConsumedLogical = consumedLogical + logical;
        var newConsumedPhysical = Math.floor(newConsumedLogical);
        var physical = newConsumedPhysical - consumedPhysical;   
        r.push({weight: w, area: physical});
        consumedLogical = newConsumedLogical;
        consumedPhysical = newConsumedPhysical;
      }
    });
    return r;
  };
 
  // For number of cells: 'tally', if we lay them out in 'numRows' rows, how many cells in each row?
  //  rowCells :: (nat, nat) -> [nat]
  var rowCells = function(tally, numRows) {
    var minCols = Math.floor(tally / numRows);
    var extraCellRows = tally % numRows;
    return = _.map(_.range(numRows), function(x, i) {
      return minCols + (i < extraCellRows ? 1 : 0);
    });
  };

  var gridifyGroup = function(totalWidth, totalHeight, numCells) {
    var numRows = Math.round(Math.sqrt((aspectRatio * totalHeight * numCells) / totalWidth)); 
    var minCols = Math.floor(numRows / numCells);
    var maxCols = minCols + 1;
    var numExtraCellRows = numRows % numCells;
    return {numRows: numRows, minCols: minCols, maxCols: maxCols, numExtraCellRows: numExtraCellRows);
  };

  var layoutGroup = function(x, y, totalWidth, totalHeight, tiles) {
    var numCells = tiles.length;
    var grid = gridifyGroup(totalWidth, totalHeight, numCells);
    var xtra = grid.numExtraCellRows * grid.maxCols;
    var cellHeight = totalHeight / grid.numRows;
    var minCellWidth = totalWidth / 

    return _.map(tiles, function(x, i) {
      var cellInRow = i < xtra 
                      ? i % grid.maxCols 
                      : grid.numExtraCellRows + ((i - xtra) % grid.minCols);
      var row = i < xtra 
                ? Math.floor(i / grid.maxCols) 
                : 

    });
  };
  

  // ([{name, weight}], width, height) -> [{name, weight, left, right, width, height, fontSize}]
  var layout = function(tiles, width, height) {
    var side = function(width, height) { return height; };
    var totalArea = width * height;

    // FIX: sort tiles by weight then alphabetically
    var tallyWs = tallyWeights(tiles);
    var totalW = totalWeight(tallyWs);
    var allocWs = allocWeights(tallyWs, totalW, side(width, height));

    var numRows =     

  };

})();
