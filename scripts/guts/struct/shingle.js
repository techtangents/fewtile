define(['guts/mashing/util'], function(util) {
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

  var sizeEq = function(a, b) {
    return a.width === b.width && a.height === b.height;
  };

  var styleEq = function(a, b) {
    return a['background-color'] === b['background-color'] && a.color === b.color;
  };

  var eq = function(a, b) {
    return (
      a.text === b.text &&
      styleEq(a.style, b.style) &&
      posEq(a.pos, b.pos) &&
      sizeEq(a.size, b.size)
    );
  };

  return {
    nu: nu,
    eq: eq
  };
});