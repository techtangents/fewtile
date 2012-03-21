define(['guts/tile'], function(tile) {
  var t = tile.individual;

  return {
    blue           : t.pass,
    blue_anime     : t.passBuilding,

    red            : t.fail,
    red_anime      : t.failBuilding,
    yellow         : t.fail,
    yellow_anime   : t.failBuilding,
    aborted        : t.fail,
    aborted_anime  : t.failBuilding,

    grey           : t.disabled,
    grey_anime     : t.disabledBuilding,
    disabled       : t.disabled,
    disabled_anime : t.disabledBuilding
  };
});