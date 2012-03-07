(function($) {
    $.fn.textfill = function() {
        var container = this;

        var mkSize = function(width, height) {
          return {width: width, height: height};
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

        var parentSize = measure(container.parent().parent()); 

        var min = scaleSizes(parentSize, 0.90);
        var max = scaleSizes(parentSize, 0.98);
         
        var grossBig = scaleSizes(parentSize, 2.0);
        var grossSmall = scaleSizes(parentSize, 0.5);

        var fontDelta = 1;

        return container.each(function(){
            var self = $(this);
            var fontSize = parseInt(self.css("fontSize"), 10);
            fontSize = isNaN(fontSize) || typeof fontSize !== "number" ? 10 : fontSize;
            
            var ourText = self.find("span");
            ourText.css('font-size', fontSize);

            var ourSize = measure(ourText);
            var percentage = divideSizes(ourSize, parentSize);
            
            var side = percentage.width >= percentage.height ? "width" : "height";

            if (ourSize[side] >= grossBig[side] || ourSize[side] <= grossSmall[side]) {
              // apply gross scaling of font size
              fontSize = fontSize / percentage[side];
              ourText.css('font-size', fontSize); 
            }

            while (ourText.height() < min.height && ourText.width() < min.width) {
                fontSize += fontDelta;
                ourText.css('font-size', fontSize);
            }  
            
            while (ourText.height() > max.height || ourText.width() > max.width) {
                fontSize -= fontDelta;
                ourText.css('font-size', fontSize);
            }
        });
    };
})(jQuery);

