define(['guts/source/poller', 'guts/source/sources', 'guts/source/ajaxer'], function(poller, sources, ajaxer) {

  var period = 5000;

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
    failingJobs: mk(sources.failingJobs),
    allGroups:   mk(sources.allGroups)
  };
});