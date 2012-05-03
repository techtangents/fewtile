define(['guts/struct/maybe'], function(maybe) {

  var none = maybe.none;

  var tile = function(weight) {
    return function(cssClass) {
      return function(link) {
        return function(text) {
          return {
            text: text,
            cssClass: cssClass,
            weight: weight,
            link: link,
            toString: function() {
              return "(" + [text, cssClass, weight, passing].join(', ') + ")";
            }
          };
        };
      };
    };
  };

  var eq = function(a, b) {
    return a.text === b.text && a.cssClass === b.cssClass && a.weight === b.weight && a.passing === b.passing && maybe.eq(a.link, b.link);
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
        loading          : tile(100)("loadingTile")     (none())("Loading...")
      , dead             : tile(100)("deadTile")        (none())("&#x2620;")
      , allPassing       : tile(100)("allPassingTile")  (none())("All jobs passing")
      , noJobs           : tile(100)("noJobsTile")      (none())("No jobs")
      , noneBuilding     : tile(100)("noneBuildingTile")(none())("No jobs building")
    },
    eq: eq,
    key: key
  };
});