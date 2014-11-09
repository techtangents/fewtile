define([], function() {
  var nu = function(width, height) {
    return {
      width: width,
      height: height
    };
  };

  var bimap = function(size, f) {
    return nu(f(size.width), f(size.height));
  };

  var eq = function(a, b) {
    return a.width === b.width && a.height === b.height;
  };

  var divide = function(numerator, denominator) {
    return nu(numerator.width / denominator.width, numerator.height / denominator.height);
  };

  var scale = function(s, factor) {
    return bimap(s, function(x) { return x * factor; });
  };

  return {
    nu: nu,
    bimap: bimap,
    eq: eq,
    divide: divide,
    scale: scale
  };
});