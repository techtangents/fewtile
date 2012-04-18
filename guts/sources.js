var sources = (function() {

  var colorMap = {
    blue: 'pass',
    blue_anime: "building",
    red: 'fail',
    red_anime: "failed_rebuilding",
    grey: 'disabled',
    grey_anime: 'disabled',
    disabled: 'disabled',
    disabled_anime: 'disabled',
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

  var failingJobs = {
    url: "/api/json?tree=jobs[name,color]",
    clickUrl: "/job/",
    noJobsName: "All jobs passing",
    handle: function(data) {
      var r = {};
      _.each(data.jobs, function(x) {
        var c = colorMapOrDie(x.color);
        if (isBadStatus(c)) {
          r[x.name] = c;
        }
      });
      return r;
    }
  };

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
    allGroups: allGroups
  };
})();
