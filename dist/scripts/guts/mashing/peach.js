define(['guts/mashing/parmap'], function(parmap) {
  return function(fs, callback) {
    parmap(fs, function(x, cb) {
      x(cb);
    }, function(_) {
      callback();
    });
  };
});