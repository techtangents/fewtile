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
              return "(" + [text, cssClass, weight].join(', ') + ")";
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

  var oat = function(cssClass, text) {
    return tile(100)(cssClass)(none())(text);
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
        loading          : oat("loadingTile"      , "Loading...")
      , dead             : oat("deadTile"         , "&#x2620;")
      , allPassing       : oat("allPassingTile"   , "All jobs passing")
      , noJobs           : oat("noJobsTile"       , "No jobs")
      , noneBuilding     : oat("noneBuildingTile" , "No jobs building")
    },
    eq: eq,
    key: key
  };
});