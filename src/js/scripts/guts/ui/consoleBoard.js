define(['underscore'], function(_) {
  return function() {
    var update = function(oldState, newState, diffs) {
      var a = function(id, value) {
        return ['add', id, value];
      };

      var r = function(id) {
        return ['remove', id];
      };

      var c = function(id, value) {
        return ['change', id. value];
      };

      var sz = _.map(diffs, function(d) {
        return d(a, r, c);
      });
      console.log(diffs);
    };

    return {
      update: update
    };
  };
});