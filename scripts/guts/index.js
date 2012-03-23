define(['underscore'], function(_) {

  //  index :: [a] -> (a -> String) -> {String: a}
  return function(xs, id) {
    var r = {};
    _.each(xs, function(x) {
      r[id(x)] = x;
    });
    return r;
  };
});
