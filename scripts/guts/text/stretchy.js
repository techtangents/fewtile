define(['jquery', 'guts/text/textFill'], function($, textFill) {

  var mkDiv = function(text, width, height, borderWidth) {
    var div = $("<div />");
      div.css({
        width: width,
        height: height,
        position: absolute,
        border: borderWidth + "px solid green",
        left: -100000,
        top: -100000    
      });
      div.text(text);
      return div;
  };

  var addDiv = function(text, width, height, borderWidth) {
    var div = mkDiv(text, width, height, borderWidth);
    $(document.body).append(div);
    return div;
  };

  return function(text, width, height, borderWidth) {
    var div = addDiv(text, width, height, borderWidth);
    var fontSize = textFill(div);
    div.remove();
    return fontSize;
  };
});