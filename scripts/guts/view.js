define(['guts/poller', 'guts/sources', 'guts/ajaxer'], function(poller, sources, ajaxer) {

  var period = 10000;

  var mk = function(source) {
    return function(board) {
      var jax = ajaxer(source);
      poller(jax, board, period).start();
      return {
        connect: jax.connect,
        disconnect: jax.disconnect
      };
    };
  };

  return {
    allJobs:     mk(sources.allJobs),
    failingJobs: mk(failingJobs),
    allGroups:   mk(allGroups)
  };
});