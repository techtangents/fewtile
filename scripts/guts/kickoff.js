define(['guts/view', 'guts/board', 'jquery'], function(view, board, $) {

  // TODO: sideways
  var $orDie = function(x) {
    var e = $(x);
    var size = e.size();
    if (size !== 1) {
      throw "Wrong number of elements selected by: '" + x + "'. Expected: " + 1 + " but was " + size;
    }
    return e;
  }

  return function() {
    view.allJobs(board($orDie('#fewtile')));
  };
});