define(['guts/mashing/diff', 'underscore', 'guts/struct/op'], function(diff, _, op) {
  return function(assert) {
    var eq = function(a, b) {
      return a.key === b.key && a.value === b.value;
    };
    var key = function(a) {
      return a.key;
    };

    var check = function(a, b, expected) {
      var xpc = _.map(expected, op.toObject);
      var actual = _.map(diff(a, b, key, eq), op.toObject);
      assert.deepEqual(actual, xpc);
    };

    var add = op.add;
    var remove = op.remove;
    var change = op.change;

    check([], [], []);
    check([], [{key:'k', value:'v'}], [add('k', {key: 'k', value: 'v'})]);
    check([{key:'k', value:'v'}], [], [remove('k')]);
    check(
      [{key:'k', value:'v1'}], 
      [{key:'k', value:'v2'}], 
      [change('k', {key: 'k', value: 'v2'})]
    );
  };
});