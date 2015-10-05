define(
  [
    'guts/struct/signal'
  ], 
  function(signal) {

    /** A signal that produces 'undefined' periodically.
     *  - on start, a value is produced immediately
     *  - we wait for consumer, delay, then produce again
     */
    var poller = function(delay) {

      var go = function(sink) { 
        var spit = function() {
          sink(undefined, wait);
        };

        var wait = function() {
          setTimeout(spit, delay);
        };
        spit();
      };

      return signal(go);
    };

    return poller;
  };
});
