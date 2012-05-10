define(function() {
  // data Op key value = Add key value | Remove key | Change key value value 

  var strung = function(f) {
    f.toString = function() {
      return toString(f);
    };
    return f;
  };

  var add = function(key, value) { 
    return strung(function(a, r, c) {
      return a(key, value);
    });
  };

  var remove = function(key) {
    return strung(function(a, r, c) {
      return r(key);
    });
  };

  var change = function(key, oldValue, newValue) {
    return strung(function(a, r, c) {
      return c(key, oldValue, newValue);
    });
  };

  var toObject = function(op) {
    var a = function(key, value) {
      return {type: 'add', key: key, value: value};
    };
    var r = function(key) {
      return {type: 'remove', key: key};
    };
    var c = function(key, oldValue, newValue) {
      return {type: 'change', key: key, oldValue: oldValue, newValue: newValue};
    };
    return op(a, r, c);
  };

  var toString = function(op) {
    var a = function(key, value) {
      return "op.add(" + key + ", " + value + ")"; 
    };
    var r = function(key) {
      return "op.remove(" + key + ")";
    };
    var c = function(key, value) {
      return "op.change(" + key + ", " + value + ")";
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
