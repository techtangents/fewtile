define(
  [
    'guts/source/view',
    'guts/ui/board',
    'guts/ui/kquery',
    'guts/mashing/util'
  ],
  function(view, board, kquery, util) {

    var $orDie = kquery.$orDie;

    var menu = function() {
      location.href = "index.html";
    };

    var single = util.objectMap(view, function(v) {
      return function() {
        var element = $orDie(".fewtile")
        v(board(element));
      };
    });

    var open = function(qs, element) {
        qs == "?allJobs"      ? single.allJobs()
      : qs == "?failingJobs"  ? single.failingJobs()
      : qs == "?buildingJobs" ? single.buildingJobs()
      : qs == "?allGroups"    ? single.allGroups()
      : menu();
    };

    return function() {
      open(document.location.search);
    };
  }
);