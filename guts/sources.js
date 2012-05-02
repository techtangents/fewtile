var sources = (function() {

  var colorMap = {
    blue: 'pass',
    blue_anime: "building",
    red: 'fail',
    red_anime: "failed_rebuilding",
    grey: 'disabled',
    grey_anime: 'building',
    disabled: 'disabled',
    disabled_anime: 'building',
    yellow: "fail",
    yellow_anime: "failed_rebuilding",
    aborted: "fail",
    aborted_anime: "failed_rebuilding"
  };

  var colorMapOrDie = function(color) {
    var c = colorMap[color];
    if(!c) throw "Jenkins gave a 'color' value I don't know about: " + String(color);
    return c;
  };

  var badStatii = ["fail", "failed_rebuilding"];

  var isBadStatus = function(c) {
    return _.include(badStatii, c);
  };

  var isBuildingStatus = function(c) {
    var suffix = "building";
    return c.indexOf(suffix, c.length - suffix.length) !== -1;
  };

  var allJobs = {
    url: "/api/json?tree=jobs[name,color]",
    clickUrl: "/job/",
    noJobsName: "No jobs",
    handle: function(data) {
      var r = {};
      _.each(data.jobs, function(x) {
        r[x.name] = colorMapOrDie(x.color);
      });
      return r;
    }
  };

  var createFilter = function(name, filter) {
    return {
      url: "/api/json?tree=jobs[name,color]",
      clickUrl: "/job/",
      noJobsName: name,
      handle: function(data) {
        var r = {};
        _.each(data.jobs, function(x) {
          var c = colorMapOrDie(x.color);
          if (filter(c)) {
            r[x.name] = c;
          }
        });
        return r;
      }
    };
  };

  var failingJobs = createFilter("All jobs passing", isBadStatus);

  var buildingJobs = createFilter("No jobs building", isBuildingStatus);

  var allGroups = {
    url: "/api/json?tree=views[name,color,jobs[name,color]]",
    clickUrl: "/view/",
    noJobsName: "No groups",
    handle: function(data) {
      var r = {};
      _.each(data.views, function(view) {
        var name = view.name;
        if (name != "All") {
          var hasFail = _.any(view.jobs, function(job) {
            var c = colorMapOrDie(job.color);
            return isBadStatus(c);
          });
          r[view.name] = hasFail ? "fail" : "pass";
        }
      });
      return r;
    }
  };

  return {
    allJobs: allJobs,
    failingJobs: failingJobs,
    buildingJobs: buildingJobs,
    allGroups: allGroups
  };
})();
