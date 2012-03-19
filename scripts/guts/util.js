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
      o[i] = f(x, i);
    });
    return r;
  };

  var arraySum = function(a) {
    return _.reduceRight(a, plus, 0);
  };

  var arrayMean = function(a) {
    return arraySum(a) / a.length;
  };

  return {
    numberOrZero: numberOrZero,
    plus: plus,
    objectMap: objectMap,
    arraySum: arraySum,
    arrayMean: arrayMean
  };
});
