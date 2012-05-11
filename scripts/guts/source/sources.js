define(['underscore', 'guts/struct/tile', 'guts/source/colorMap', 'guts/mashing/util', 'guts/struct/maybe'],
  function(_, tile, colorMap, util, maybe) {

  var overarching = tile.overarching;
  var individual = tile.individual;
  var konst = util.konst;
  var none = maybe.none;
  var some = maybe.some;
  var filterMapMaybe = maybe.filterMapMaybe;

  var flonkle = function(a, o, t) {
    var q = t(a);
    return q.length === 0 ? [o] : q;
  };

  var jobbie = function(emptyTile, filterer) {
    return {
      url: "/api/json?tree=jobs[name,color]",
      clickUrl: "/job/",
      handle: function(data) {
        return flonkle(data.jobs, emptyTile, function(jobs) {
          return filterMapMaybe(jobs, function(job) {
            var status = colorMap[job.color];
            if (status === undefined) throw "Unknonwn status: " + job.color;
            return filterer(status)
              ? some(status.tile(some("/job/" + job.name))(job.name))
              : none();
          });
        });
      }
    };
  };

  var allJobs = jobbie(overarching.noJobs, konst(true));

  var failingJobs = jobbie(overarching.allPassing, function(status) { return !status.isPassing; });

  var buildingJobs = jobbie(overarching.noneBuilding, function(status) { return status.isBuilding; });

  var getAllGroups = function(views) {
    var views_ = _.filter(views, function(view) {
      return view.name !== "All";
    });
    return _.map(views_, function(view) {
      var hasFail = _.any(view.jobs, function(job) {
        return !colorMap[job.color].isPassing;
      });

      var hasBuilding = _.any(view.jobs, function(job) {
        return colorMap[job.color].isBuilding;
      });

      var f = hasFail
                      ? hasBuilding ? individual.failBuilding : individual.fail
                      : hasBuilding ? individual.passBuilding : individual.pass;
      return f(some("/view/" + view.name))(view.name);
    });
  };


  var g = function(x) {
    return "views[name,jobs[name,color]" + x + "]";
  };

  var g_ = function(x) {
    return g("," + x);
  }

  var allGroups = {
    url: "/api/json?tree=" + g_(g_(g_(g_(g_(g_(g_(g('')))))))),
    clickUrl: "/view/",
    handle: function(data) {
      var all = [];
      var rec = function(vs) {
        _.each(vs, function(v) {
          if (v.jobs !== undefined && v.jobs.length != 0) {
            all.push(v);
          }
          if (v.views !== undefined && v.views.length > 0) {
            rec(v.views);
          }
        });
      };
      rec(data.views);
      return flonkle(all, overarching.noJobs, getAllGroups);
    }
  };

  return {
    allJobs: allJobs,
    buildingJobs: buildingJobs,
    failingJobs: failingJobs,
    allGroups: allGroups
  };
});
