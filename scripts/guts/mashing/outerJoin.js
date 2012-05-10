define(function() {
  return function(left, right) {
    var r = {}; 
    _.each(left, function(x, i) {
      r[i] = {left: x}; 
    }); 
    _.each(right, function(x, i) {
      r[i] = r[i] || {}; 
      r[i].right = x;
    }); 
    return r;
  };
});
