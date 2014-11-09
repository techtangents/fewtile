define(['underscore'], function(_) {
  return function(a, f, callback) {
    if (a.length == 0) {
      callback([]);
    } else {
      var r = [];
      var count = 0;
      _.each(a, function(x, i) {
        f(x, function(q) {
          r[i] = q;
          count++;
          if (count === a.length) {
            callback(r);
          }
        });
      });
    }
  };
});
