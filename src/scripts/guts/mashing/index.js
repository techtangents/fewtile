define(['underscore'], function(_) {

  //  index :: [a] -> (a -> String) -> {String: a}
  return function(xs, key) {
    var r = {};
    _.each(xs, function(x) {
      r[key(x)] = x;
    });
    return r;
  };
});
