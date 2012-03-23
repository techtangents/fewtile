define(['guts/diff', 'underscore', 'guts/op'], function(diff, _, op) {
  return function(assert) {
    var eq = function(a, b) {
      return a === b;
    };
    var id = function(a) {
      return a;
    };

    var check = function(a, b, expected) {
      var xpc = _.map(expected, op.toObject);
      var actual = _.map(diff(a, b, id, eq), op.toObject);
      assert.deepEqual(actual, xpc);
    };

    var add = op.add;
    var remove = op.remove;
    var change = op.change;

    check([], [], []);
    check([], ['a'], [add('a', 'a')]);
  };
});