var sources = (function() {

  var colorMap = {
    blue: 'pass',
    red: 'fail',
    grey: 'disabled',
    disabled: 'disabled',
    yellow: "fail",
    aborted: "fail",
    aborted_anime: "fail",
    blue_anime: "building",
    yellow_anime: "failed_rebuilding",
    red_anime: "failed_rebuilding"
  };

  var colorMapOrDie = function(color) {
    var c = colorMap[color];
    if(!c) throw "Jenkins gave a 'color' value I don't know about: " + String(color);
    return c;
  };

  var allJobs = {
    url: "/api/json?tree=jobs[name,color]",
    clickUrl: "/job/",
    handle: function(data) {
      var r = {};
      _.each(data.jobs, function(x) {
        r[x.name] = colorMapOrDie(x.color);
      });
      return r;
    }
  };

  var badStatii = ["fail", "failed_rebuilding"];

  var allGroups = {
    url: "/api/json?tree=views[name,color,jobs[name,color]]",
    clickUrl: "/view/",
    handle: function(data) {
      var r = {};
      _.each(data.views, function(view) {
        var name = view.name;
        var hasFail = _.any(view.jobs, function(job) {
          var c = colorMapOrDie(job.color);
          return _.include(badStatii, c);
        });
        r[view.name] = hasFail ? "fail" : "pass";
      });
      return r;
    }
  };

  return {
    allGroups:  allGroups,
    allJobs: allJobs
  };
})();
