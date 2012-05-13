/**
thespyder & techtangents' über text filling algorithm

Scales the font-size of an element so that it roughly fills its parent.

Scales in two phases:

1. Gross scale
- Find the percentage width and height of the element, relative to its parent's rendered width and height.
- For the greater of these two percentages, if it's within a threshold then scale the font size (in pixels)
  by that percentage, applying a minor tweak.

2. Fine tune
- If necessary, apply minor adjustments up or down, measuring as we go, until the element roughly fills the
  parent.
- The text doesn't precisely fill the element - a range of acceptible sizes is in place, to avoid minor
  change in text size when the visual effect good enough.

This technique performs well by minimizing the number of times:
- the text is resized in the DOM
- the element is measured

Visually, it works roughly like this:
size------------->
|{-->  <--}        [            ]   |            {-->
  gross             acceptible     element      gross
  scale             range          bounds         scale
  range                                           range


Known issues:
- Make sure the direct parent is fixed size.


// FIX: Do the calculations on an 'off-screen' div - actually in the DOM, but large negative x,y.
        This resize then just returns a value, without mutating the 'real' div.
*/
define([
  'jquery',
  'guts/struct/size'
], function(
  $,
  size
) {

  var measureInner = function(element) {
    return size.nu(element.innerWidth(), element.innerHeight());
  };

  var measureOuter = function(element) {
    return size.nu(element.outerWidth(true), element.outerHeight(true));
  };

  var measure = function(element) {
    return size.nu(element.width(), element.height());
  };

  var scaleSizes = function(s, factor) {
    return size.nu(s.width * factor, s.height * factor);
  };

  var minFontSize = 2;
  var maxFontSize = 2000;

  var minScale = 0.85;
  var maxScale = 0.90;
  var grossDelta = 0.2;

  var grossTweak = 0.95;
  var fontDelta = 1;

  return function(width, height, text) {

    var div = $("<div />");
    div.addClass('tile');
    div.css({
      position: 'absolute',
      left: -10000,
      top: -10000,
      width: width + "px",
      height: height + "px"
    });

    var element = $("<span />");
    element.text(text);

    div.append(element);
    $(document.body).append(div);

    var chfont = function(fs) {
      element.css('font-size', fs);
    };

    var parentSize = measureInner(div);
    var min = scaleSizes(parentSize, minScale);
    var max = scaleSizes(parentSize, maxScale);

    var grossBig = scaleSizes(parentSize, 1 + grossDelta);
    var grossSmall = scaleSizes(parentSize, 1 - grossDelta);

    element.css({border: 0, margin: 0, padding:0});
    var ourSize = measureOuter(element);

    var fontSize = parseInt(element.css("fontSize"), 10);
    fontSize = isNaN(fontSize) || typeof fontSize !== "number" ? 10 : fontSize;

    if (ourSize.width > 0 && ourSize.height > 0) {
      element.css('font-size', fontSize);

      var percentage = size.divide(ourSize, parentSize);
      var side = percentage.width >= percentage.height ? "width" : "height";

      if (ourSize[side] >= grossBig[side] || ourSize[side] <= grossSmall[side]) {
        fontSize = Math.round(fontSize / percentage[side] * grossTweak);
        chfont(fontSize);
      }

      while (
           element.outerHeight(true) < min.height
        && element.outerWidth(true) < min.width
        && fontSize <= maxFontSize
      ) {
        fontSize += fontDelta;
        chfont(fontSize);
      }

      while (
           (element.outerHeight(true) > max.height || element.outerWidth(true) > max.width)
        && fontSize >= minFontSize
      ) {
        fontSize -= fontDelta;
        chfont(fontSize);
      }
    }

    div.remove();

    return fontSize;
  };
});
