define(['underscore', 'guts/struct/tile', 'guts/struct/maybe'], function(_, tile, maybe) {

  var none = maybe.none;

  return function(assert) {
    _.each(tile.overarching, function(x) {
      assert.equal(true, tile.eq(x, x));
    });

    _.each(tile.individual, function(x) {
      assert.equal(true, tile.eq(x(none())('a'), x(none())('a')));
    })
  };
});