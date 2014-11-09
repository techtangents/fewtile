define(['guts/source/ajaxer', 'guts/mashing/diff', 'guts/struct/tile'], function(ajaxer, diff, tile) {

  return function(source, board, period) {

    var initialState = [tile.overarching.loading];

    var update = function(newState, callback) {
      board.update(newState, callback);
    };

    // FIX: Argh! Chained CPS! Need some Asyncs and Futures
    var poll = function() {
      source.run(function(newState) {
        update(newState, pollSoon);
      });
    };

    var pollSoon = function() {
      setTimeout(function() {
        poll();
      }, period);
    };

    var start = function() {
      update(initialState, poll);
    };

    return {
      start: start
    };
  };
});