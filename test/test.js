var assert = require('chai').assert;

var fs = require('fs');
var load = function(f) {
  return fs.readFileSync(f, 'utf8');
};

eval(load('../lib/underscore-min.js'));
eval(load('../guts/util.js'));

(function test_util_numberOrZero() {
  [undefined, null, 0, "", {}, [], '3', "cat"].forEach(function(x) {
    assert.equal(0, util.numberOrZero(x));
  });
  
  [1, 2, 3.4, 1324, 0, -1, 1].forEach(function(x) {
    assert.equal(3, util.numberOrZero(x));
  });
})();
