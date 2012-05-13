define([
  'guts/struct/maybe',
  'guts/ui/stylize',
  'jquery'
], function(
  maybe,
  stylize,
  $
) {
  var nu = function(value) {
    var div = $("<div class='tile' />");
    var textElement = $("<span />");
    div.append(textElement);
    var block = {
      div: div,
      textElement: textElement
    };

    div.css(stylize(value));

    // assumes the text won't change
    textElement.text(value.text);

    // assumes the link won't change
    maybe.forEach(value.link, function(t) {
      // Chrome has issues with cursor:pointer - doesn't seem to show unless you hover on and off a few times. kooky.
      div.css('cursor', 'pointer');
      div.find("*").css('cursor', 'pointer');
      div.click(function() {
        window.open(t, '_blank');
      });
    });
    return block;
  };

  return {
    nu: nu
  };
});