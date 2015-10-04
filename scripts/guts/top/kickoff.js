define(
  [
    'guts/source/view',
    'guts/ui/board',
    'guts/ui/kquery',
    'guts/mashing/util',
    'guts/mashing/lute',
    'guts/source/sources',
    'underscore'
  ],
  function(view, board, kquery, util, lute, sources, _) {

    var $orDie = kquery.$orDie;

    var menu = function() {
      location.href = "index.html";
    };

    var single = function(src, group) {
      var element = $orDie(".fewtile")
      view.create(src(group), board(element));
    };

    var combinatorial = function(group) {
      ['allGroups', 'failingJobs', 'buildingJobs'].forEach(function(x) {
        var element = $orDie('.' + x);
        var src = sources[x];
        view.create(src(group), board(element));
      });
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
    };

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
