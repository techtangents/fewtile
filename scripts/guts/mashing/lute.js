define([], function() {

  // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/fromCharCode
  var fromCharCode = function(codePt) {
    if (codePt > 0xFFFF) {
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    } else {
        return String.fromCharCode(codePt);
    }
  };

  var removeLeading = function(prefix, s) {
    return s.startsWith(prefix) ? s.substring(prefix.length) : s;
  };

  return {
    fromCharCode: fromCharCode,
    removeLeading: removeLeading
  }
});
