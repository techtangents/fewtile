define(['guts/mashing/outerJoin', 'guts/mashing/index', 'guts/struct/op'], function(outerJoin, index, op) {

  // diff :: ([a], [a], (a -> String), ((a, a) -> Boolean)) -> [Op]
  return function(a, b, key, eq) {
    var ia = index(a, key);
    var ib = index(b, key);
    var oj = outerJoin(ia, ib);

    var r = [];

    _.each(oj, function(x, i) {
      var left = x.left;
      var right = x.right;
      var hasLeft = left !== undefined;
      var hasRight = right !== undefined;

      if (hasLeft) {
        if (hasRight) {
          if (!eq(left, right)) {
            r.push(op.change(i, left, right));
          }
        } else {
          r.push(op.remove(i));
        }
      } else if (hasRight) {
        r.push(op.add(i, right));
      }
    });
    return r;
  };
});