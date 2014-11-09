define(['underscore'], function(_) {

  var round = Math.round;

  return function(slice) {
    var left = slice.pos.x;
    var width = slice.size.width;
    var right = left + width;

    var newLeft = round(left);
    var newRight = round(right);
    var newWidth = newRight - newLeft;

    var top = slice.pos.y;
    var height = slice.size.height;
    var bottom = top + height;

    var newTop = round(top);
    var newBottom = round(bottom);
    var newHeight = newBottom - newTop;

    return {
      pos: {
        x: newLeft,
        y: newTop
      },
      size: {
        width: newWidth,
        height: newHeight
      }
    };
  };
});