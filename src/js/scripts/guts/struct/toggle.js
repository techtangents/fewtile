define(function() {
  return function(initial) {
    var b = initial;
    
    var on = function() {
      b = true;
    };

    var off = function() {
      b = false;
    };

    var isOn = function() {
      return b;
    };

    return {
      on: on,
      off: off,
      isOn: isOn
    };
  };
});