(function($) {
    $.fn.textfill = function() {
        var container = this;

        var minFontSize = 6;
        var maxFontSize = 100;

        var parentHeight = container.parent().parent().height();
        var parentWidth = container.parent().parent().height();

        var maxFactor = 0.95;
        var maxHeight = parentHeight * maxFactor;
        var maxWidth = parentHeight * maxFactor;

        var minFactor = 0.80;        
        var minHeight = parentHeight * minFactor;
        var minWidth = parentWidth * minFactor;

        var fontDelta = 1;

        return container.each(function(){
            var self = $(this);
            var fontSize = parseInt(self.css("fontSize"), 10);
            fontSize = isNaN(fontSize) || typeof fontSize !== "number" ? 10 : fontSize;
            fontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize));
            
            var ourText = self.find("span");

            var textHeight = ourText.height();
            var textWidth = ourText.width();

            ourText.css('font-size', fontSize);

            while (ourText.height() < minHeight && ourText.width() < minWidth && fontSize <= maxFontSize) {
                fontSize += fontDelta;
                ourText.css('font-size', fontSize);
            }  
            
            while ((ourText.height() > maxHeight || ourText.width() > maxWidth) && fontSize >= minFontSize) {
                fontSize -= fontDelta;
                ourText.css('font-size', fontSize);
            }
        });
    };
})(jQuery);

