define(['guts/comparison'], function(comparison) {
  return function(assert) {
    var strict = comparison.strict;
    var lt = comparison.lt;
    var gt = comparison.gt;
    var eq = comparison.eq;
    var isLt = comparison.isLt;
    var isGt = comparison.isGt;
    var isLte = comparison.isLte;
    var isGte = comparison.isGte;
    var isEq = comparison.isEq;

    var barf = function() { 
      throw 'barf'; 
    };

    var konst = function(x) {
      return function() { 
        return x; 
      };
    };

    assert.equal(1, strict(lt)(1, 2, 3));
    assert.equal(2, strict(eq)(1, 2, 3));
    assert.equal(3, strict(gt)(1, 2, 3));

    assert.equal(1, lt(konst(1), barf, barf));
    assert.equal(2, eq(barf, konst(2), barf));
    assert.equal(3, gt(barf, barf, konst(3)));

    var checkIz = function(k, a, b, c, d, e) {
      assert.equal(a, isLt(k));
      assert.equal(b, isLte(k));
      assert.equal(c, isEq(k));
      assert.equal(d, isGte(k));
      assert.equal(e, isGt(k));
    };

    checkIz(lt, true,  true,  false, false, false);
    checkIz(eq, false, true,  true,  true,  false);
    checkIz(gt, false, false, false, true,  true );


  };
});