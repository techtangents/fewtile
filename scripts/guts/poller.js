define(['guts/ajaxer', 'guts/diff', 'guts/tile', 'guts/op'], function(ajaxer, diff, tile, op) {

  return function(fullSource, board, period) {

    // FIX: Argh! Chained CPS! Need some Asyncs and Futures
    var poll = function(oldState) {
      fullSource.run(function(newState) {
        var d = diff(oldState, newState, op.key, tile.eq);
        board.update(d, pollSoon(newState));
      });
    };

    var pollSoon = function(oldState) {
      setTimeout(function() { 
        poll(oldState); 
      }, period);
    };

    var start = function() {
      poll([tile.loading]);
    };

    return {
      start: start
    };
  };
});