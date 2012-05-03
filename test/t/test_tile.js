define(['underscore', 'guts/struct/tile'], function(_, tile) {
  return function(assert) {
    _.each(tile.overarching, function(x) {
      assert.equal(true, tile.eq(x, x));
    });

    _.each(tile.individual, function(x) {
      assert.equal(true, tile.eq(x('a'), x('a')));
    })
  };
});