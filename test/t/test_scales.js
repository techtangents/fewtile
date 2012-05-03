define(['guts/ui/scales', 'guts/struct/tile', 'guts/struct/maybe'], function(scales, tile, maybe) {

  var some = maybe.some;
  var none = maybe.none;

  return function(assert) {

    (function twoSameWeight() {
      var n = none();
      var a = tile.individual.pass(n)('a');
      var b = tile.individual.pass(n)('b');

      var gs = scales.groupByWeight([a, b]);
      assert.deepEqual(gs, [
        { weight: a.weight,
          groupWeight: a.weight * 2,
          tiles: [a, b]
        }
      ]);

      assert.equal(a.weight * 2, scales.globalWeight(gs));
    })();

    (function twoDifferentWeight() {
      var a = tile.individual.pass(none())('a');
      var b = tile.individual.fail(none())('b');
      assert.notEqual(a.weight, b.weight, "These tiles have the same weight - test is invalid.");

      var gs = scales.groupByWeight([a, b]);
      assert.deepEqual(gs, [
        {weight: a.weight, groupWeight: a.weight, tiles: [a]},
        {weight: b.weight, groupWeight: b.weight, tiles: [b]}
      ]);

      var globalWeight = scales.globalWeight(gs);
      assert.equal(a.weight + b.weight, globalWeight);

      assert.equal(
        Math.round(
          scales.groupHeight(a.weight, globalWeight, 800) + 
          scales.groupHeight(b.weight, globalWeight, 800)
        ),
        800
      );
    })();
  };
});