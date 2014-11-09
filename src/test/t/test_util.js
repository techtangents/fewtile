define(['guts/mashing/util'], function(util) { 
  return function(assert) {
    [undefined, null, 0, "", {}, [], '3', "cat"].forEach(function(x) {
      assert.equal(0, util.numberOrZero(x));
    }); 
  
    [1, 2, 3.4, 1324, 0, -1, 1].forEach(function(x) {
      assert.equal(x, util.numberOrZero(x));
    }); 

    assert.equal(0, util.arraySum([]));
    assert.equal(2, util.arraySum([2]));
    assert.equal(7, util.arraySum([2, 5]));

    assert.equal(0, util.arrayMean([0]));
    assert.equal(2.5, util.arrayMean([0, 5]));

    assert.deepEqual({a: 3}, util.objectMap({a: 1}, function(x) { return x + 2; }));

    assert.equal(3, util.prop('q')({q: '3'}));

  }; 
});
