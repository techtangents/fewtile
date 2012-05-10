define(['guts/struct/maybe'], function(maybe) {

  var none = maybe.none;

  var tile = function(weight) {
    return function(style) {
      return function(link) {
        return function(text) {
          return {
            text: text,
            style: style,
            weight: weight,
            link: link,
            toString: function() {
              return "(" + [text, style['background-color'], style['color'], weight].join(', ') + ")";
            }
          };
        };
      };
    };
  };

  var eq = function(a, b) {
    return a.text === b.text && a.style['background-color'] === b.style['background-color'] && a.style.color === b.style.color && a.weight === b.weight && a.passing === b.passing && maybe.eq(a.link, b.link);
  };

  var key = function(t) {
    return t.text;
  };

  var oat = function(style, text) {
    return tile(100)(style)(none())(text);
  };

  var defaultFg = '#ffffff';

  var style = function(bg, fg) {
    return {
      'background-color': bg,
      color: fg || defaultFg
    }
  };

  var styles = {
    disabled:     style('#999999', '#eeeeee'),
    dead:         style('#000000'),
    loading:      style('#0000ff'),
    fail:         style('#BD3333'),
    pass:         style('#308A48'),
    failBuilding: style('#9C6425'),
    passBuilding: style('#99D638')
  };

  return {
    individual: {
        pass             : tile( 10)(styles.pass)
      , passBuilding     : tile( 10)(styles.passBuilding)
      , fail             : tile( 50)(styles.fail)
      , failBuilding     : tile( 50)(styles.failBuilding)
      , disabled         : tile(  5)(styles.disabled)
      , disabledBuilding : tile(  5)(styles.disabled)
    },
    overarching: {
        loading          : oat(styles.loading  , "Loading...")
      , dead             : oat(styles.dead     , "&#x2620;")
      , allPassing       : oat(styles.pass     , "All jobs passing")
      , noJobs           : oat(styles.fail     , "No jobs")
      , noneBuilding     : oat(styles.disabled , "No jobs building")
    },
    eq: eq,
    key: key
  };
});