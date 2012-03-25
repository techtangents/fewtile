define(['guts/layout', 'guts/tile'], function(layout, tile) {
  return function(assert) {
    assert.deepEqual(
      layout.layout(800, 600, [tile.overarching.loading]),
      [{
        text: 'Loading...',
        cssClass: 'loadingTile',
        pos: {x: 0, y: 0},
        size: {width: 800, height: 600}
      }]
    );


    layout.layout(800, 600, [tile.individual.pass("a"), tile.individual.pass("b")]);

  };
});