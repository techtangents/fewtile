define(function() {
  // data Op = Add id value | Remove id | Change id value 

  var add = function(id, value) {
   return function(a, r, c) {
     return a(id, value);
   };
  };

  var remove = function(id) {
    return function(a, r, c) {
      return r(id);
    };
  };

  var change = function(id, newValue) {
    return function(a, r, c) {
      return c(id, newValue);
    };
  };

  return {
    add: add,
    remove: remove,
    change: change
  };
});
