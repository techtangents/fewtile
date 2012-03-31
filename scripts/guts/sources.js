define(['underscore', 'guts/tile', 'guts/colorMap', 'guts/util'], function(_, tile, colorMap, util) {

  var overarching = tile.overarching;
  var individual = tile.individual;

  var flonkle = function(a, o, t) {
    return a.length === 0 ? [o] : t(a);
  };

  var mapJobs = function(jobs) {
    return _.map(jobs, function(job) {
      // FIX: handle if not found in colorMap
      return colorMap[job.color](job.name);
    });
  };

  var allJobs = {
    url: "/api/json?tree=jobs[name,color]",
    clickUrl: "/job/",
    handle: function(data) {
      return flonkle(data.jobs, overarching.noJobs, mapJobs);
    }
  };

  var jobFails = function(job) {
    return !job.passing; 
  };

  var getFailingJobs = function(jobs) {
    return _.filter(mapJobs(jobs), jobFails);
  };

  var failingJobs = {
    url: "/api/json?tree=jobs[name,color]",
    clickUrl: "/job/",
    handle: function(data) {
      return flonkle(data.jobs, overarching.allPassing, getFailingJobs);
    }
  };

  var getAllGroups = function(views) {
    var views_ = _.filter(views, function(view) {
      return view.name !== "All";
    });
    return _.map(views_, function(view) {
      var jobs = mapJobs(view.jobs);
      var hasFail = _.any(jobs, jobFails);
      var f = hasFail ? individual.pass : individual.fail;
      return f(view.name);
    });
  };

  var allGroups = {
    url: "/api/json?tree=views[name,color,jobs[name,color]]",
    clickUrl: "/view/",
    handle: function(data) {
      return flonkle(data.views, overarching.noJobs, getAllGroups);
    }
  };

  return {
    allJobs: allJobs,
    failingJobs: failingJobs,
    allGroups: allGroups
  };
});
