define(function() {
  // data Op key value = Add key value | Remove key | Change key value 

  var add = function(key, value) {
   return function(a, r, c) {
     return a(key, value);
   };
  };

  var remove = function(key) {
    return function(a, r, c) {
      return r(key);
    };
  };

  var change = function(key, value) {
    return function(a, r, c) {
      return c(key, value);
    };
  };

  var toObject = function(op) {
    var a = function(key, value) {
      return {type: 'add', key: key, value: value};
    };
    var r = function(key) {
      return {type: 'remove', key: key};
    };
    var c = function(key, value) {
      return {type: 'change', key: key, value: value};
    };
    return op(a, r, c);
  };

  var key = function(op) {
    var f = function(i) {
      return i;
    };
    return op(f, f, f);
  };

  return {
    add: add,
    remove: remove,
    change: change,
    toObject: toObject,
    key: key
  };
});
