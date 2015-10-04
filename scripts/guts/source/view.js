define(['guts/source/poller', 'guts/source/sources', 'guts/source/ajaxer'], function(poller, sources, ajaxer) {

  var period = 3000;

  var create = function(source, board) {
    var jax = ajaxer(source);
    poller(jax, board, period).start();
    return {
      connect: jax.connect,
      disconnect: jax.disconnect
    };
  };

  return {
    create: create
  };
});
