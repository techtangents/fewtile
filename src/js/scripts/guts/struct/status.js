define(['guts/struct/tile'], function(tile) {
  var s = function(tile, isPassing, isBuilding) {
    return {
      tile: tile,
      isPassing: isPassing,
      isBuilding: isBuilding
    };
  };

  var ti = tile.individual;
  return {
    pass             : s(ti.pass,             true,  false),
    passBuilding     : s(ti.passBuilding,     true,  true ),
    fail             : s(ti.fail,             false, false),
    failBuilding     : s(ti.failBuilding,     false, true ),
    disabled         : s(ti.disabled,         true,  false),
    disabledBuilding : s(ti.disabledBuilding, true,  true )
  }
});