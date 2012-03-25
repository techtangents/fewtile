define(['guts/layout', 'guts/tile', 'underscore'], function(layout, tile, _) {
  return function(assert) {
    (function layoutSingleCell() {
      assert.deepEqual(
        layout.layout(800, 600, [tile.overarching.loading]),
        [{
          text: 'Loading...',
          cssClass: 'loadingTile',
          pos: {x: 0, y: 0},
          size: {width: 800, height: 600}
        }]
      );      
    })();

    (function layoutTwoCells() {
      var validGroupLayout = function(l, i) {
        var check = function(n, name) {
          assert.equal('number', typeof n, name + ' was not a number. Was: ' + typeof n);
          assert.equal(false, isNaN(n), name + ' was NaN');
          assert.equal(true, n >= 0, name + ' was not >= 0: ' + n);
        };

        check(l.pos.x, i + ': pos.x');
        check(l.pos.y, i + ': pos.y');
        check(l.size.width, i + ': size.width');
        check(l.size.height, i + ': size.height');
      };
      var ls = layout.layout(800, 600, [tile.individual.pass("a"), tile.individual.pass("b")]);
      _.each(ls, validGroupLayout);
    })();
  };
});