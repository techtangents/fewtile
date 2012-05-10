define(['jquery', 'guts/struct/tile', 'guts/struct/toggle'], function($, tile, toggle) {
  return function(source) {

    var t = toggle(true);

    var aDead = [tile.overarching.dead];

    var run = function(callback) {
      if (t.isOn()) {
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

    return {
      connect: t.on,
      disconnect: t.off,
      run: run
    };
  };
});