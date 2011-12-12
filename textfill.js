(function($) {
    $.fn.textfill = function(maxFontSize, maxWords) {
        maxFontSize = parseInt(maxFontSize, 10);
        maxWords = parseInt(maxWords, 10) || 3;
        return this.each(function(){
            var self = $(this),
                orgText = self.text(),
                fontSize = parseInt(self.css("fontSize"), 10),
                lineHeight = parseInt(self.css("lineHeight"), 10),
                maxHeight = self.height(),
                maxWidth = self.width(),
                words = self.text().split(" ");
            
            function calcSize(text) {
                var ourText = $("<span>"+text+"</span>").appendTo(self),
                    multiplier = maxWidth/ourText.width(),
                    newSize = fontSize*(multiplier-0.1);
                ourText.css(
                    "fontSize", 
                    (maxFontSize > 0 && newSize > maxFontSize) ? 
                        maxFontSize : 
                        newSize
                );
                var scrollHeight = self[0].scrollHeight;
                if (scrollHeight  > maxHeight) {
                    multiplier = maxHeight/scrollHeight;
                    newSize = (newSize*multiplier);
                    ourText.css(
                        "fontSize", 
                        (maxFontSize > 0 && newSize > maxFontSize) ? 
                            maxFontSize : 
                            newSize
                    );
                }
            }
            self.empty();
            if (words.length > maxWords) {
                while (words.length > 0) {
                    var newText = words.splice(0, maxWords).join(" ");
                    console.log
                    calcSize(newText);
                    self.append("<br>");
                }
            } else {
                calcSize(orgText);
            }
        });
    };
})(jQuery);

