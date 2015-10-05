define(
  [
    'guts/source/view',
    'guts/ui/board',
    'guts/ui/kquery',
    'guts/mashing/util',
    'guts/mashing/lute',
    'guts/mashing/parmap',
    'guts/source/sources',
    'underscore'
  ],
  function(view, board, kquery, util, lute, parmap, sources, _) {

    var $orDie = kquery.$orDie;

    var menu = function() {
      location.href = "index.html";
    };

    var single = function(src, group) {
      var element = $orDie(".fewtile")
      var b = board(element);
      var j = ajaxer(sources.url);

      poller(period).mapAsync(j).map(src.handle).mapAsync(b.update).start();
    };

    var combinatorial = function(group) {
      var j = ajaxer(sources.url);
      var sectionNames = ['allGroups', 'failingJobs', 'buildingJobs'];

      var sections = sectionNames.map(function(x) {
        var element = $orDie('.' + x);
        var b = board(element)
        var s = sources[x];
        return {board: b, source: s}
      });

      poller(period).mapAsync(j).teeAsync(sections, function(x, section, callback) {
        section.board.update(section.source.handle(x), callback);
      }).start();
    };

    var parseQs = function(qs) {
      var qs_ = lute.removeLeading('?', qs);
      var params = qs_.split('&');
      var r = {};
      params.forEach(function(p) {
        var bits = p.split('=');
        if (bits.length !== 2) throw "Query parameters must be key=value";
        r[bits[0]] = bits[1];
      });
      return r;


    var open = function(qs, element) {
      var args = parseQs(qs);
      var page = args.page || 'menu';
      var group = args.group || 'All';

      if (page === "allJobs") {
        single(sources.allJobs, group);
      } else if (page === "failingJobs") {
        single(sources.failingJobs, group);
      } else if (page === "buildingJobs") { 
        single(sources.buildingJobs, group);
      } else if (page === "allGroups") {
        single(sources.allGroups, group);
      } else if (page === "combinatorial") {
        combinatorial(group);
      } else {
        menu();
      }
    };

    return function() {
      open(document.location.search);
    };
  }
);
