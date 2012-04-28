define(['guts/ui/layout', 'guts/mashing/diff', 'guts/mashing/util', 'guts/text/textFill'], 
  function(layout, diff, util, textFill) {

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

  var change = function(block, value) {
    var div = block.div;
    var textElement = block.textElement;
    div.addClass(value.cssClass);
    textElement.text(value.text);
    div.css({
      left: value.pos.x,
      top: value.pos.y,
      width: value.size.width,
      height: value.size.height
    });
  };

  var render = function(value) {
    var div = $("<div />");
    var textElement = $("<span />");
    div.css({
      position: 'absolute'
    });
    div.addClass('tile');
    div.append(textElement);
    var block = {
      div: div,
      textElement: textElement
    };
    change(block, value);
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

    var c = function(id, value) {
      var block = blocks[id];
      change(block, value);
      textFill(block.textElement);
    };

    var viewState = [];
    var update = function(oldState, newState, diffs) {
      var width = container.width();
      var height = container.height();
      var newViewState = layout.layout(width, height, newState);
      var ops = diff(viewState, newViewState, util.prop('text'), eq);
      viewState = newViewState; 
      _.each(ops, util.invokeWith(a, r, c));
    };
    return {
      update: update
    };
  };
});