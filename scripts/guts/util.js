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

  var bound = function(min, max, value) {
    return Math.max(min, Math.min(max, value));
  };

  var groupBy = function(key, array) {
    var r = {};
    _.each(criteria, function(x) {
      var k = key(x);
      if (r.hasOwnProperty(k)) {
        r[k] = [];
      }
      r[k].push(x);
    });
    var s = [];
    _.each(r, function(x, i) {
      s.push({key: i, members: x});
    });
    return s;
  };

  return {
    numberOrZero: numberOrZero,
    plus: plus,
    objectMap: objectMap,
    arraySum: arraySum,
    arrayMean: arrayMean,
    prop: prop,
    lookup: lookup,
    bound: bound,
    groupBy: groupBy
  };
});
