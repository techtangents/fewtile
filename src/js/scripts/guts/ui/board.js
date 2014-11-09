define([
  'guts/ui/layout',
  'guts/mashing/diff',
  'guts/mashing/util',
  'guts/struct/maybe',
  'jquery',
  'ba-resize',
  'guts/mashing/peach',
  'underscore',
  'guts/struct/shingle',
  'guts/ui/animator',
  'guts/ui/stylize',
  'guts/ui/block'
  ],
  function(
    layout,
    diff,
    util,
    maybe,
    $,
    $resize,
    peach,
    _,
    shingle,
    animator,
    stylize,
    block
  ) {

  var animate = true;

  return function(container) {
    var blocks = {};
    var a = function(id, value) {
      return function(callback) {
        var b = block.nu(value);
        blocks[id] = b;
        animator.add(b.div, container, callback);
      };
    };

    var r = function(id) {
      return function(callback) {
        var div = blocks[id].div;
        delete blocks[id];
        animator.remove(div, callback);
      };
    };

    var c = function(id, oldValue, newValue) {
      return function(callback) {
        animator.change(blocks[id].div, stylize(newValue), callback);
      };
    };

    var viewState = [];
    var dataState = [];

    var update = function(newState, callback) {
      var width = container.width();
      var height = container.height();
      dataState = newState;
      var newViewState = layout.layout(width, height, newState);
      var ops = diff(viewState, newViewState, util.prop('text'), shingle.eq);
      viewState = newViewState;
      var fxs = _.map(ops, util.invokeWith(a, r, c));
      peach(fxs, callback);
    };

    $.resize.delay = 500;

    $(container).resize(function() {
      update(dataState, function(){});
    });

    return {
      update: update
    };
  };
});