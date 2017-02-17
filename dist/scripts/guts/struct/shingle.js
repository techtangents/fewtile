define([
  'guts/mashing/util',
  'guts/struct/size'
],
function(
  util,
  size
) {
  var merge = util.merge;
  var narrow = util.narrow;

  var nu = function(tile, layout) {
    return merge(
      narrow(tile,   ['text', 'style', 'link']),
      narrow(layout, ['pos', 'size'])
    );
  };

  var posEq = function(a, b) {
    return a.x === b.x && a.y === b.y;
  };

  var styleEq = function(a, b) {
    return a['background-color'] === b['background-color'] && a.color === b.color;
  };

  var eq = function(a, b) {
    return (
      a.text === b.text &&
      styleEq(a.style, b.style) &&
      posEq(a.pos, b.pos) &&
      size.eq(a.size, b.size)
    );
  };

  return {
    nu: nu,
    eq: eq
  };
});