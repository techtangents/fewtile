define([], function() {
  var addSize = function(pos, size) {
    return pos(pos.x + size.width, pos.y + size.y);
  };

  var pos = function(x, y) {
    return {x: x, y: y};
  };

  return {
    pos: pos,
    addSize: addSize
  };
});