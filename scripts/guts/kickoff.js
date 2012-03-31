define(['guts/view', 'guts/board', 'guts/ui/kquery'], function(view, board, kquery) {

  var $orDie = kquery.$orDie;

  var run = function(element) { 
    return function(curView) {
      curView(board(element));
    };
  };

  var menu = function() {
    location.href = "index.html";
  };

  var open = function(qs, element) {
    var r = run(element);
      qs == "?allJobs"     ? r(view.allJobs) 
    : qs == "?failingJobs" ? r(view.failingJobs)
    : qs == "?allGroups"   ? r(view.allGroups)
    : menu();
  };

  return function() {
    open(document.location.search, $orDie('#fewtile'));
  };
});