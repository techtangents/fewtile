define(['guts/layout', 'guts/diff', 'guts/util'], function(layout, diff, util) {

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

  var change = function(div, value) {
    div.addClass(value.cssClass);
    div.text(value.text);
    div.css({
      left: value.pos.x,
      top: value.pos.y,
      width: value.size.width,
      height: value.size.height
    });
  };

  var render = function(value) {
    var div = $("<div />");
    div.css({
      position: 'absolute'
    });
    div.addClass('tile');
    change(div, value);
    return div;
  };

  return function(container) {
    var elements = {};

    // TODO: animate
    // TODO: make the update function asynchronous - notifying caller when update is complete

    var a = function(id, value) {
      var div = render(value);
      elements[id] = div;
      container.append(div);
    };

    var r = function(id) {
      var div = elements[id];
      div.remove();
      delete elements[id];
    };

    var c = function(id, value) {
      var div = elements[id];
      change(div, value);
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