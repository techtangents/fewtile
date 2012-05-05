define([
  'guts/ui/layout',
  'guts/mashing/diff',
  'guts/mashing/util',
  'guts/text/textFill',
  'guts/struct/maybe',
  'jquery',
  'ba-resize'
  ],
  function(layout, diff, util, textFill, maybe, $, $resize) {

  var posEq = function(a, b) {
    return a.x === b.x && a.y === b.y;
  };

  var sizeEq = function(a, b) {
    return a.width === b.width && a.height === b.height;
  };

  var eq = function(a, b) {
    return (
      a.text === b.text &&
      a.cssClass === b.cssClass &&
      posEq(a.pos, b.pos) &&
      sizeEq(a.size, b.size)
    );
  };

  var spray = function(block, value) {
    block.textElement.text(value.text);
    block.div.css({
      left: value.pos.x,
      top: value.pos.y,
      width: value.size.width,
      height: value.size.height
    });
  };

  var change = function(block, oldValue, newValue) {
    if (oldValue.cssClass !== newValue.cssClass) {
      var div = block.div;
      div.removeClass(oldValue.cssClass);
      div.addClass(newValue.cssClass);
    }
    spray(block, newValue);
  };

  var render = function(value) {
    var div = $("<div />");
    var textElement = $("<span />");
    div.css({
      position: 'absolute'
    });
    div.addClass('tile');
    div.addClass(value.cssClass);
    div.append(textElement);
    var block = {
      div: div,
      textElement: textElement
    };
    spray(block, value);

    // assumes the link won't change
    maybe.forEach(value.link, function(t) {
      div.css('cursor', 'pointer');
      div.find("*").css('cursor', 'pointer');
      div.click(function() {
        window.open(t, '_blank');
      });
    })
    return block;
  };

  return function(container) {

    var blocks = {};

    // TODO: animate
    // TODO: make the update function asynchronous - notifying caller when update is complete

    var a = function(id, value) {
      var block = render(value);
      blocks[id] = block;
      container.append(block.div);
      textFill(block.textElement);
    };

    var r = function(id) {
      var block = blocks[id];
      block.div.remove();
      delete blocks[id];
    };

    var c = function(id, oldValue, newValue) {
      var block = blocks[id];
      change(block, oldValue, newValue);
      textFill(block.textElement);
    };

    var viewState = [];
    var dataState = [];

    var update = function(newState, callback) {
      var width = container.width();
      var height = container.height();
      dataState = newState;
      var newViewState = layout.layout(width, height, newState);
      var ops = diff(viewState, newViewState, util.prop('text'), eq);
      viewState = newViewState;
      _.each(ops, util.invokeWith(a, r, c));
      callback();
    };

    $.resize.delay = 1000; // helps avoid re-renders while dragging

    $(container).resize(function() {
      // TODO: wire a toggle in here to prevent concurrent events?
      update(dataState, function(){});
    });

    return {
      update: update
    };
  };
});