define(['guts/mashing/util'], function(util) {
  
  var always = util.always;
  var never = util.never;

  var embellish = function(x, sz) {
    x.toString = util.konst(sz);
    return x;
  }

  var none = function() {
    return embellish(
      function(noneFn, someFn) { return noneFn(); }, 
      "maybe.none()");
  };

  var some = function(x) {
    return embellish( 
      function(noneFn, someFn) { return someFn(x); },
      "maybe.some(" + x + ")");
  };

  var filterMapMaybe = function(arrayMaybe, filterMap) {
    var r = [];
    for (var i = 0; i < arrayMaybe.length; i++) {
      var m = filterMap(arrayMaybe[i]);
      m(
        function(){}, 
        function(y) { r.push(y); }
      );
    }
    return r;
  };

  var eq = function(ma, mb) {
    return ma(function() {
      return mb(always, never);
    }, function(a) {
      return mb(never, function(b) { return a === b; });
    });
  };

  var forEach = function(ma, f) {
    ma(function(){}, f);
  };

  return {
    some: some,
    none: none,
    filterMapMaybe: filterMapMaybe,
    eq: eq,
    forEach: forEach
  };
});