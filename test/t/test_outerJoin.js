define(['guts/outerJoin'], function(outerJoin) { 
  return function(assert) {
    assert.deepEqual({}, outerJoin({}, {}));
    assert.deepEqual({a: {left:1, right:2}}, outerJoin({a: 1}, {a: 2}));
    assert.deepEqual({a: {left:1}}, outerJoin({a: 1}, {}));
    assert.deepEqual({a: {right:2}}, outerJoin({}, {a: 2}));
  }; 
});
