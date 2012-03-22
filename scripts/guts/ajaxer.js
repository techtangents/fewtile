define(['jquery', 'guts/tile'], function($, tile) {
  return function(source) {

    var connected = true;

    var connect = function() {
      connected = true;
    };

    var disconnect = function() {
      connected = false;
    };

    var aDead = [tile.dead];

    var run = function(callback) {
      if (connected) {
        $.getJSON(source.url)
          .done(function(data, textStatus, jqXHR) {
            var r = data ? source.handle(data) : aDead;
            callback(r);
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            callback(aDead);
          });
        } else {
          callback(aDead);
        }
      };
    };

    return {
      connect: connect,
      disconnect: disconnect,
      run: run
    };
  };
});