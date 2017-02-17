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
    _.each(array, function(x) {
      var k = key(x);
      if (!r.hasOwnProperty(k)) {
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

  var merge = function(/* args... */) {
    var r = {};
    var f = function(x, i) {
      r[i] = x;
    };
    _.each(arguments, function(o) {
      _.each(o, f);
    });
    return r;
  };

  var submerge = function(as, bs) {
    if (as.length !== bs.length) {
      throw "Arrays were different lengths";
    }
    var r = [];
    for (var i = 0; i < as.length; i++) {
      r.push(merge(as[i], bs[i]));
    }
    return r;
  };

  var narrow = function(o, props) {
    var r = {};
    _.each(props, function(i) {
      r[i] = o[i];
    });
    return r;
  };

  var invokeWith = function() {
    var args = arguments;
    return function(f) {
      return f.apply(null, args);
    };
  };

  var konst = function(x) {
    return function() {
      return x;
    };
  };

  var always = konst(true);
  var never = konst(false);

  var zip = function(a, b) {
    var r = [];
    for (var i = 0; i < a.length && i < b.length; i++) {
      r.push({a: a[i], b: b[i]});
    }
    return r;
  };

  return {
    always: always,
    never: never,
    numberOrZero: numberOrZero,
    plus: plus,
    objectMap: objectMap,
    arraySum: arraySum,
    arrayMean: arrayMean,
    prop: prop,
    lookup: lookup,
    bound: bound,
    groupBy: groupBy,
    merge: merge,
    submerge: submerge,
    narrow: narrow,
    invokeWith: invokeWith,
    konst: konst,
    zip: zip
  };
});
