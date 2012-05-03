define(['guts/ui/layout', 'guts/struct/tile', 'underscore', 'guts/struct/maybe', 'guts/mashing/util'], function(layout, tile, _, maybe, util) {

  var some = maybe.some;
  var none = maybe.none;
  var narrow = util.narrow;

  return function(assert) {
    var assertArrayOfTilesEq = function(expected, actual) {
      var nr = function(x) {
        return narrow(x, ['text', 'cssClass', 'pos', 'size']);
      };

      var nrs = function(x) {
        return _.map(x, nr);
      };

      assert.deepEqual(nrs(expected), nrs(actual));

      var links = function(x) {
        return _.map(x, util.prop('link'));
      };

      var q = util.zip(links(expected), links(actual));
      _.each(q, function(z) {
        assert.ok(maybe.eq(z.a, z.b));
      });
    };

    (function layoutSingleCell() {
      var actual = layout.layout(800, 600, [tile.overarching.loading]);
      var expected = [{
        text: 'Loading...',
        cssClass: 'loadingTile',
        pos: {x: 0, y: 0},
        size: {width: 780, height: 580},
        link: none()
      }];
      assertArrayOfTilesEq(expected, actual);      
    })();

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

    var validGroupLayouts = function(ls) {
      _.each(ls, validGroupLayout);
    };

    (function layoutTwoCellsSameType() {
      validGroupLayouts(
        layout.layout(800, 600, [
          tile.individual.pass(none())("a"), tile.individual.pass(none())("b")
        ]));
    })();

    (function layoutTwoCellsDifferentType() {
      validGroupLayouts(layout.layout(800, 600, [tile.individual.pass(none())("a"), tile.individual.fail(none())("b")]));
    })();

    (function() {
      validGroupLayouts(layout.layout(1920, 1245, [{"text":"Loading...","cssClass":"loadingTile","weight":100,"passing":false}]));
    })();

    (function() {
      layout.layout(1234, 1234, [{"text":"aasdfasdf","cssClass":"failTile","weight":50,"passing":false},{"text":"adsfasdf","cssClass":"passTile","weight":10,"passing":true},{"text":"asdfasdf","cssClass":"passTile","weight":10,"passing":true},{"text":"asdfasdfasdf","cssClass":"disabledTile","weight":5,"passing":true},{"text":"l","cssClass":"passTile","weight":10,"passing":true},{"text":"SDASDFADSF","cssClass":"disabledTile","weight":5,"passing":true}]);
    })();
  };
});