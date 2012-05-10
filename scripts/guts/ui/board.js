define([
  'guts/ui/layout',
  'guts/mashing/diff',
  'guts/mashing/util',
  'guts/text/textFill',
  'guts/struct/maybe',
  'jquery',
  'ba-resize',
  'guts/mashing/peach',
  'underscore',
  'jquery-color'
  ],
  function(layout, diff, util, textFill, maybe, $, $resize, peach, _, jqueryColor) {

  var posEq = function(a, b) {
    return a.x === b.x && a.y === b.y;
  };

  var sizeEq = function(a, b) {
    return a.width === b.width && a.height === b.height;
  };

  var eq = function(a, b) {
    return (
      a.text === b.text &&
      a.style['background-color'] === b.style['background-color'] &&
      a.style.color === b.style.color &&
      posEq(a.pos, b.pos) &&
      sizeEq(a.size, b.size)
    );
  };

  var stylize = function(value) {
    return util.merge(value.style, {
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

    // assumes the text won't change
    textElement.text(value.text);

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

  var animate = true;

  return function(container) {

    var blocks = {};

    // TODO: animate
    // TODO: make the update function asynchronous - notifying caller when update is complete

    var a = function(id, value) {
      return function(callback) {
        var block = render(value);
        blocks[id] = block;
        var styles = stylize(value);

        block.div.css(styles);

        if (animate) {
          block.div.hide();
        }

        container.append(block.div);

        if (animate) {
          block.div.fadeIn('fast', function() {
            textFill(block.textElement);
            callback();
          });
        } else {
          textFill(block.textElement);
          callback();
        }
      };
    };

    var r = function(id) {
      return function(callback) {
        var block = blocks[id];
        var done = function() {
          block.div.remove();
          delete blocks[id];
          callback();
        };
        if (animate) {
          block.div.fadeOut('fast', function() {
            done();
          });
        } else {
          done();
        }
      };
    };

    var c = function(id, oldValue, newValue) {
      return function(callback) {
        var block = blocks[id];
        var styles = stylize(newValue);

        if (animate) {
          block.div.animate(styles, function() {
            textFill(block.textElement);
            callback();
          });
        } else {
          block.div.css(styles);
          textFill(block.textElement);
          callback();
        }
      };
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
      var fxs = _.map(ops, util.invokeWith(a, r, c));
      peach(fxs, callback);
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