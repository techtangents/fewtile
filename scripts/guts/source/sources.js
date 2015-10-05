define(['underscore', 'guts/struct/tile', 'guts/source/colorMap', 'guts/mashing/util', 'guts/struct/maybe'],
  function(_, tile, colorMap, util, maybe) {

  var overarching = tile.overarching;
  var individual = tile.individual;
  var konst = util.konst;
  var none = maybe.none;
  var some = maybe.some;
  var filterMapMaybe = maybe.filterMapMaybe;

  var uberUrl = (function() {

    var g = function(x) {
      return "views[name,jobs[name,color]" + x + "]";
    };

    var g_ = function(x) {
      return g("," + x);
    };

    return "/api/json/?tree=" + g_(g_(g_(g_(g_(g_(g_(g(''))))))));
  })();

  /** Jenkins gives us a tree of views and their jobs. 
   *  This function flattens the views to one level and shows all their descendent jobs.
   */
  var flattenViews = function(data) {
    var jobsForView = function(view) {
      var jobs = view.jobs === undefined ? [] : view.jobs;
      var descendentsJobs = view.views === undefined ? [] : util.arrayBind(view.views, jobsForView);
      return jobs.concat(descendentsJobs);
    };

    var views = data.views.map(function(v) {
      return {name: v.name, jobs: jobsForView(v)};
    });

    var jobs = data.jobs || [];

    return {
      views: views
    };
  };

  var jobbie = function(emptyTile, filterer) {
    return function(group) {
      return {
        url: uberUrl,
        clickUrl: "/job/",
        handle: function(data) {
          var sparta = flattenViews(data);
          var view = sparta.views.find(function(v) { return group === v.name; });

          if (view === undefined) {
            // "group not found" - maybe a different message?
            return [emptyTile];
          }

          var jobs = view.jobs;
          var tiles = filterMapMaybe(jobs, function(job) {
            var status = colorMap[job.color];
            if (status === undefined) throw "Unknonwn status: " + job.color;
            return (filterer(status)
              ? some(status.tile(some("/job/" + job.name))(job.name))
              : none()
            );
          });
          return tiles.length === 0 ? [emptyTile] : tiles;
        }
      };
    };
  };

  var allJobs = jobbie(overarching.noJobs, konst(true));

  var failingJobs = jobbie(overarching.allPassing, function(status) { return !status.isPassing; });

  var buildingJobs = jobbie(overarching.noneBuilding, function(status) { return status.isBuilding; });

  var getAllGroups = function(views) {
    return _.map(views, function(view) {
      var hasFail = _.any(view.jobs, function(job) {
        if (job.color === undefined) throw "job.color is undefined for job with name: " + job.name + " view name: " + view.name;
        return !colorMap[job.color].isPassing;
      });

      var hasBuilding = _.any(view.jobs, function(job) {
        return colorMap[job.color].isBuilding;
      });

      var f = (
        hasFail
          ? hasBuilding ? individual.failBuilding : individual.fail
          : hasBuilding ? individual.passBuilding : individual.pass
      );
      return f(some("/view/" + view.name))(view.name);
    });
  };

  var allGroups = function(group) { 
    return {
      url: uberUrl,
      clickUrl: "/view/",
      handle: function(data) {
        var sparta = flattenViews(data);
        var views = sparta.views;

        // if All: show the All group only if it's the only group
        // if specific: show only that group, if it exists
        var selectedGroups = (
          group === 'All'
            ? (views.length === 0 || views.length === 1)
              ? views 
              : sparta.views.filter(function(v) { return 'All' !== v.name; })
            : sparta.views.filter(function(v) { return group === v.name; })
        );

        var tiles = getAllGroups(selectedGroups);          
        return tiles.length === 0 ? overarching.noGroups : tiles;
      }
    };
  };

  return {
    allJobs: allJobs,
    buildingJobs: buildingJobs,
    failingJobs: failingJobs,
    allGroups: allGroups,
    url: uberUrl
  };
});
