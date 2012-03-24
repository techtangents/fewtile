require.config({
  paths: {
    "jquery"     : "lib/jquery-1.7.1.min",
    "underscore" : "lib/underscore"
  }
});

require(['jquery'], function($) {
  $(document).ready(function() {
    var container = $("#container");
    var makeDiv = function(x, y, width, height, borderColor) {
      var d = $("<div />");
      d.css({
        position: 'absolute',
        top: y,
        left: x,
        width: width,
        height: height,
        border: "10px solid " + borderColor
      });
      return d;
    };

    container.append(makeDiv(0, 20, 940, 300, 'blue'));
    container.append(makeDiv(960, 20, 940, 300, 'green'));
  });
});
