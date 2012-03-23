define(['guts/op'], function(op) {
  return function(assert) {
    assert.equal('a', op.key(op.add('a', 'quack')));
    assert.equal('a', op.key(op.remove('a')));
    assert.equal('a', op.key(op.change('a', 'quack')));

    assert.deepEqual({type:'add', key:'a', value:'quack'}, op.toObject(op.add('a', 'quack')));
    assert.deepEqual({type:'remove', key:'a'}, op.toObject(op.remove('a')));
    assert.deepEqual({type:'change', key:'a', value:'quack'}, op.toObject(op.change('a', 'quack')));
  };
});