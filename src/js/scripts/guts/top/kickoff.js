define(
  [
    'guts/source/view',
    'guts/ui/board',
    'guts/ui/kquery',
    'guts/mashing/util',
    'underscore'
  ],
  function(view, board, kquery, util, _) {

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

    var combinatorial = function() {
      _.each(
        ['allGroups', 'failingJobs', 'buildingJobs'],
        function(x) {
          view[x](board($orDie('.' + x)));
        }
      );
    };

    var open = function(qs, element) {
        qs == "?allJobs"       ? single.allJobs()
      : qs == "?failingJobs"   ? single.failingJobs()
      : qs == "?buildingJobs"  ? single.buildingJobs()
      : qs == "?allGroups"     ? single.allGroups()
      : qs == "?combinatorial" ? combinatorial()
      : menu();
    };

    return function() {
      open(document.location.search);
    };
  }
);