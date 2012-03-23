define(['guts/ajaxer', 'guts/diff', 'guts/tile'], function(ajaxer, diff, tile) {

  return function(source, board, period) {

    var initialState = [tile.overarching.loading];

    var update = function(oldState, newState, callback) {
      var d = diff(oldState, newState, tile.key, tile.eq);
      board.update(oldState, newState, d, callback(newState));
    };

    // FIX: Argh! Chained CPS! Need some Asyncs and Futures
    var poll = function(oldState) {
      source.run(function(newState) {
        update(oldState, newState, pollSoon);
      });
    };

    var pollSoon = function(oldState) {
      setTimeout(function() { 
        poll(oldState); 
      }, period);
    };

    var start = function() {
      update([], initialState, poll);
    };

    return {
      start: start
    };
  };
});