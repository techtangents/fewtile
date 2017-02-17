define(['guts/struct/tile', 'guts/struct/status'], function(tile, status) {
  var t = tile.individual;
  var s = status;

  return {
    blue           : s.pass,
    blue_anime     : s.passBuilding,

    red            : s.fail,
    red_anime      : s.failBuilding,
    yellow         : s.fail,
    yellow_anime   : s.failBuilding,
    aborted        : s.fail,
    aborted_anime  : s.failBuilding,

    grey           : s.disabled,
    grey_anime     : s.disabledBuilding,
    disabled       : s.disabled,
    disabled_anime : s.disabledBuilding,
    notbuilt       : s.disabled,
    notbuilt_anime : s.disabledBuilding
  };
});
