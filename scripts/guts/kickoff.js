define(['guts/view', 'guts/board', 'jquery'], function(view, board, $) {
  return function() {
    view.allJobs(board($('#fewtile')));
  };
});