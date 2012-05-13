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

  return {
    nu: nu,
    bimap: bimap,
    eq: eq
  };
});