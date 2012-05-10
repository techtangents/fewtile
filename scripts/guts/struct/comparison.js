define(['underscore'], function(_) {
  // data Comparison = LT | EQ | GT

  var strung = function(sz, f) {
    f.toString = function() {
      return sz;
    };
    return f;
  };

  var lt = strung('lt', function(l, e, g) {
    return l();
  });

  var eq = strung('eq', function(l, e, g) {
    return e();
  });

  var gt = strung('gt', function(l, e, g) {
    return g();
  });

  var konst = function(v) {
    return function() { return v; };
  };

  // returns a comparison where the fold is strict
  var strict = function(comparison) {
    return function(l, e, g) {
      return comparison(konst(l), konst(e), konst(g));
    };
  };

  var min = function(kompare) {
    return function(a, b) {
      return strict(kompare(a, b))(a, a, b);
    };
  };

  var max = function(kompare) {
    return function(a, b) {
      return strict(kompare(a, b))(b, a, a);
    };
  };

  var arrayMin = function(kompare) {
    return function(a) {
      return _.reduceRight(a, min(kompare));
    };
  };

  var arrayMax = function(kompare) {
    return function(a) {
      return _.reduceRight(a, max(kompare));
    };
  };

  var reverse = function(kompare) {
    return function(a, b) {
      return strict(kompare(a, b))(gt, eq, lt);
    };
  };

  var arraySort = function(kompare) {
    return function(array) {
      var clone = Array.prototype.slice.call(array);
      clone.sort(function(a, b) {
        return strict(kompare(a, b))(-1, 0, 1);
      });
      return clone;
    };
  };

  var ltgt = function(a, b) {
    return a < b ? lt : a > b ? gt : eq;
  };

  var by = function(f) {
    return function(a, b) {
      return ltgt(f(a), f(b));
    };
  };

  var iz = function(l, e, g) {
    return function(c) {
      return strict(c)(l, e, g);
    };
  };

  var isLt  = iz(true,  false, false);
  var isLte = iz(true,  true,  false);
  var isEq  = iz(false, true,  false);
  var isGte = iz(false, true,  true );
  var isGt  = iz(false, false, true );

  return {
    lt: lt,
    eq: eq,
    gt: gt,
    min: min,
    max: max,
    arrayMin: arrayMin,
    arrayMax: arrayMax,
    arraySort: arraySort,
    strict: strict,
    ltgt: ltgt,
    by: by,
    isLt: isLt,
    isLte: isLte,
    isEq: isEq,
    isGte: isGte,
    isGt: isGt,
    reverse: reverse
  };
});