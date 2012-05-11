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

  return {
    fromCharCode: fromCharCode
  }
});