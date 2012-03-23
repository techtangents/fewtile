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

  var change = function(id, value) {
    return function(a, r, c) {
      return c(id, value);
    };
  };

  var toObject = function(op) {
    var a = function(id, value) {
      return {id: id, value: value};
    };
    var r = function(id) {
      return {id: id};
    };
    return op(a, r, a);
  }

  return {
    add: add,
    remove: remove,
    change: change,
    toObject: toObject
  };
});
