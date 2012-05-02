define([], function() {
  
  var none = function() {
    return function(noneFn, someFn) {
      return noneFn();
    };
  };

  var some = function(x) {
    return function(noneFn, someFn) {
      return someFn(x);
    };
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

  return {
    some: some,
    none: none,
    filterMapMaybe: filterMapMaybe
  };
});