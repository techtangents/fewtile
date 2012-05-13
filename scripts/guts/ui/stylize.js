define([
  'guts/text/textFill',
  'guts/mashing/util'
], function(
  textFill,
  util
) {
  return function(value) {
    var fontSize = textFill(value.size.width, value.size.height, value.text);

    return util.merge(value.style, value.size, {
      left: value.pos.x,
      top: value.pos.y,
      'font-size': fontSize + "px"
    });
  };
});