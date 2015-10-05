define(
  [
    'guts/mashing/parmap' 
  ],
  function(parmap) {

    var noopConsumer = function(x, callback) {
      callback();
    };
 
    /** A producer of a stream of values.  
     *  Once a value is produced, the consumer processes it asynchronously.
     *  The producer waits for the consumer to return.
     *  
     *  producer: function(consumer) {...}
     *  consumer: function(x, callback) {...}
     */
    var signal = function(producer) {

      var start = function(consumer) {
        var consumer_ = consumer || noopConsumer; 
        producer(consumer);
      };

      /** map a signal over a pure function */
      var map = function(f) {
        return signal(function(consumer) {
          producer(function(x, cb) {
            consumer(f(x), cb);
          });
        });
      }); 

      /** map a signal over an asynchronous function(x, callback) {...} */
      var mapAsync = function(f) {
        return signal(function(consumer) {
          producer(function(x, cb) {
            f(x, function(y) {
              consumer(y, cb);
            });
          });
        };
      };

      /** Given an array and an asynchronous function(x, y, callback) {...},
       *  parMap the function over the array; passing the signal value (x) and the current array element y.
       *  The array of results created by this process is produced to the consumer.
      var teeAsync = function(array, f) {
        return mapAsync(function(x, cb) {
          parmap(array, function(y, cb2) {
            f(x, y, cb2);
          }, cb); 
        });
      };

      return {
        start: start,
        map: map,
        mapAsync: mapAsync,
        teeAsync: teeAsync
      };
    };

    /** a signal that produces a given value only once */
    var single = function(c) {
      return signal(function(cb) {
        cb(x, function(){});
      });
    };

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

    return {
      signal: signal
    };
  }
);
