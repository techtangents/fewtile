define(['guts/layout', 'guts/tile'], function(layout, tile) {
  return function(assert) {
    console.log(layout.layout(800, 600, [tile.overarching.loading]));
  };
});