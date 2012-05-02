define(function() {
  var tile = function(weight) {
    return function(cssClass) {
      return function(text) {
        return {
          text: text,
          cssClass: cssClass,
          weight: weight,
          toString: function() {
            return "(" + [text, cssClass, weight, passing].join(', ') + ")";
          }
        };
      };
    };
  };

  var eq = function(a, b) {
    return a.text === b.text && a.cssClass === b.cssClass && a.weight === b.weight && a.passing === b.passing;
  };

  var key = function(t) {
    return t.text;
  };

  return {
    individual: {
        pass             : tile( 10)("passTile")
      , passBuilding     : tile( 10)("passBuildingTile")
      , fail             : tile( 50)("failTile")
      , failBuilding     : tile( 50)("failBuildingTile")
      , disabled         : tile(  5)("disabledTile")
      , disabledBuilding : tile(  5)("disabledBuildingTile")
    },
    overarching: {
        loading          : tile(100)("loadingTile")     ("Loading...")
      , dead             : tile(100)("deadTile")        ("&#x2620;")
      , allPassing       : tile(100)("allPassingTile")  ("All jobs passing")
      , noJobs           : tile(100)("noJobsTile")      ("No jobs")
      , noneBuilding     : tile(100)("noneBuildingTile")("No jobs building")
    },
    eq: eq,
    key: key
  };
});