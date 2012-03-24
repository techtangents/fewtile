define(['guts/gridify', 'underscore', 'guts/util'], function(gridify, _, util) {
  return function(assert) {
    var ar = 7/3;

    _.each(_.range(1, 10), function(x) {
      var g = gridify(ar)(1152, 1024)(x);
      assert.equal(x, g.cells);

      assert.equal(g.cells, util.arraySum(_.map(g.rowLayouts, function(x) {
        return x.cells;
      })));

      var numRowLayouts = g.rowLayouts.length;
      assert.equal(true, numRowLayouts === 1 || numRowLayouts === 2);

      _.each(g.rowLayouts, function(x) {
        assert.equal(true, x.cells > 0);
        assert.equal(true, x.rows > 0);
        assert.equal(true, x.cols > 0);
        assert.equal(true, x.width > 0);
        assert.equal(true, x.height > 0);
        assert.equal(x.cells, x.rows * x.cols);
        assert.equal('number', typeof x.ar);
        assert.equal(false, isNaN(x.ar));
        assert.equal(false, x.ar === 0);
      });
    });

    assert.deepEqual(gridify(ar)(100, 200)(1), { rows: 1,
      cells: 1,
      rowLayouts: [ { rows: 1, cols: 1, cells: 1, width: 100, height: 200, ar: 0.5 } ],
      meanAr: 0.5 
    });

  };
});