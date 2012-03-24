define(['guts/gridify'], function(gridify) {
  return function(assert) {
    var ar = 7/2;

    assert.deepEqual(gridify(ar)(100, 200, 1), { 
      rows: 1,
      normal: { cells: 1, width: 100, height: 200, ar: 0.5 },
      skinny: { cells: 0, width: 50, height: 200, ar: 0.25 },
      meanAr: 0.5
    });
  };
});