define(['guts/ui/scales', 'guts/struct/tile'], function(scales, tile) {
  return function(assert) {

    (function twoSameWeight() {
      var a = tile.individual.pass('a');
      var b = tile.individual.pass('b');

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
      var a = tile.individual.pass('a');
      var b = tile.individual.fail('b');
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