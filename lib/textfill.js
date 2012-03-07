/**
thespyder & techtangents' ueber text filling algorithm

Scales the font-size of an element so that it roughly fills its parent.

Scales in two phases:

1. Gross scale
- Find the percentage width and height of the element, relative to its parent's rendered width and height.
- For the greater of these two percentages, if it's within a threshold then scale the font size (in pixels) by that percentage, applying a minor tweak.

2. Fine tune
- If necessary, apply minor adjustments up or down, measuring as we go, until the element roughly fills the parent. 
- The text doesn't precisely fill the element - a range of acceptible sizes is in place, to avoid minor change in text size when the visual effect good enough. 

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

*/
(function($) {

    var mkSize = function(width, height) {
      return {width: width, height: height};
    };

    var measureInner = function(element) {
      return mkSize(element.innerWidth(), element.innerHeight());
    };

    var measureOuter = function(element) {
      return mkSize(element.outerWidth(true), element.outerHeight(true));
    };

    var measure = function(element) {
      return mkSize(element.width(), element.height());
    };

    var divideSizes = function(numerator, denominator) {
      return mkSize(numerator.width / denominator.width, numerator.height / denominator.height);
    };

    var scaleSizes = function(size, factor) {
      return mkSize(size.width * factor, size.height * factor);
    };

    var fmapSize = function(size, f) {
      return mkSize(f(size.width), f(size.height));
    };

    var minFontSize = 2;
    var maxFontSize = 2000;

    var minScale = 0.95;
    var maxScale = 0.98;
    var grossDelta = 0.2; 

    var grossTweak = 0.95;
    var fontDelta = 1;

    $.fn.textfill = function() {
        return $(this).each(function(){

            var element = $(this);
            var parentSize = measureInner(element.parent()); 
            var min = scaleSizes(parentSize, minScale);
            var max = scaleSizes(parentSize, maxScale);
       
            var grossBig = scaleSizes(parentSize, 1 + grossDelta);
            var grossSmall = scaleSizes(parentSize, 1 - grossDelta);

            element.css({border: 0, margin: 0, padding:0});
            var ourSize = measureOuter(element);

            if (ourSize.width > 0 && ourSize.height > 0) {
              var fontSize = parseInt(element.css("fontSize"), 10);
              fontSize = isNaN(fontSize) || typeof fontSize !== "number" ? 10 : fontSize;

              element.css('font-size', fontSize);

              var percentage = divideSizes(ourSize, parentSize);
              var side = percentage.width >= percentage.height ? "width" : "height";

              if (ourSize[side] >= grossBig[side] || ourSize[side] <= grossSmall[side]) {
                fontSize = Math.round(fontSize / percentage[side] * grossTweak);
                element.css('font-size', fontSize);
              }

              while (element.outerHeight(true) < min.height && element.outerWidth(true) < min.width && fontSize <= maxFontSize) {
                fontSize += fontDelta;
                element.css('font-size', fontSize);
              }  
            
              while ((element.outerHeight(true) > max.height || element.outerWidth(true) > max.width) && fontSize >= minFontSize) {
                fontSize -= fontDelta;
                element.css('font-size', fontSize);
              }
            }
        });
    };
})(jQuery);

