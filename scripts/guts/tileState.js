define(function() {
  // TODO: not sure if this is needed


  // data TileState = Loading | Dead | Empty | Active [Tile]

  var loading = function() {
    return function(l, d, e, a) {
      return l();
    }
  };

  var dead = function() {
    return function(l, d, e, a) {
      return d();
    }
  };

  var empty = function() {
    return function(l, d, e, a) {
      return e();
    };
  };

  var active = function(tiles) {
    return function(l, d, e, a) {
      return a(tiles);
    };
  };

  return { 
    loading: loading,
    dead: dead,
    empty: empty,
    active: active
  };
});