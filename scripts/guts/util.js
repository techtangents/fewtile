define(['underscore'], function(_) {
  var numberOrZero = function(x) {
    return (typeof x === "number") ? x : 0;
  };

  var plus = function(x, y) {
    return x + y;
  };

  var objectMap = function(o, f) {
    var r = {};
    _.each(o, function(x, i) {
      r[i] = f(x, i);
    });
    return r;
  };

  var arraySum = function(a) {
    return _.reduceRight(a, plus, 0);
  };

  var arrayMean = function(a) {
    return arraySum(a) / a.length;
  };

  var eq = function(a, b) {
    return a === b;
  };

  var prop = function(propName) {
    return function(x) {
      return x[propName];
    };
  };

  var lookup = function(x) {
    return function(propName) {
      return x[propName];
    };
  };

  var min = function(a, compare) {
    
  };

  var minWhere = function(a, f) {
    if (a.length === 0) throw "empty array passed to minWhere";
    return a.length === 1 ? a[0] : (function() {
      var best = {v: f(a[0]), x: a[0]};
      for (var i = 1; i < a.length; i++) {
        var x = a[i];
        var v = f(x);
        if (v < best.v) {
          best = {v: v, i: a[i]};
        }
      }
      return best.x;
    })();

    

  };

  return {
    numberOrZero: numberOrZero,
    plus: plus,
    objectMap: objectMap,
    arraySum: arraySum,
    arrayMean: arrayMean,
    prop: prop,
    lookup: lookup
  };
});
