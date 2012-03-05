(function($) {
    $.fn.textfill = function(maxFontSize, maxWords) {
        maxFontSize = parseInt(maxFontSize, 6);
        var container = this;
        var allowedPadding = 0.98;
        var maxHeight = container.parent().parent().height() * allowedPadding;
        var maxWidth = container.parent().parent().width() * allowedPadding;

        return container.each(function(){
            var self = $(this);
            var fontSize = parseInt(self.css("fontSize"), 10);
            var ourText = self.find("span");
            
            var textHeight = ourText.height();
            var textWidth = ourText.width();

            ourText.css('font-size', fontSize);

            while (ourText.height() > maxHeight || ourText.width() > maxWidth) {
                fontSize -= 1;
                ourText.css('font-size', fontSize);
            } 

            while (ourText.height() < maxHeight && ourText.width() < maxWidth) {
                fontSize += 1;
                ourText.css('font-size', fontSize);
            } 
        });
    };
})(jQuery);
