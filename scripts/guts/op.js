define(function() {
  // data Op = Add id value | Remove id value | Change id value value 

  var add = function(id, value) {
   return function(a, r, c) {
     return a(id, value);
   };
  };

  var remove = function(id, value) {
    return function(a, r, c) {
      return r(id, value);
    };
  };

  var change = function(id, from, to) {
    return function(a, r, c) {
      return c(id, from, to);
    };
  };

  return {
    add: add,
    remove: remove,
    change: change
  };
});
