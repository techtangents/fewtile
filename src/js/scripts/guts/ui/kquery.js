define(['jquery'], function($) {

  var $orDie = function(x) {
    var e = $(x);
    var size = e.size();
    if (size !== 1) {
      throw "Wrong number of elements selected by: '" + x + "'. Expected: " + 1 + " but was " + size;
    }
    return e;
  };

  return {
    $orDie: $orDie
  };
});