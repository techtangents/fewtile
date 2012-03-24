define(['guts/gridify'], function(gridify) {
  return function(assert) {
    var ar = 7/2;

    assert.deepEqual(gridify(ar)(100, 200, 1), {
      
    });
  };
});