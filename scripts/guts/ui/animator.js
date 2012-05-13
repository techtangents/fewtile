define([], function() {
  var animate = true;

  var add = function(element, container, callback) {
    if (animate) {
      element.hide();
    }
    container.append(element);
    if (animate) {
      element.fadeIn('slow', callback);
    } else {
      callback();
    }
  };

  var remove = function(element, callback) {
    var done = function() {
      element.remove();
      callback();
    };
    if (animate) {
      element.fadeOut('slow', done);
    } else {
      done();
    }
  };

  var change = function(element, styles, callback) {
    if (animate) {
      element.animate(styles, 'slow', callback);
    } else {
      element.css(styles);
      callback();
    }
  };

  return {
    add: add,
    remove: remove,
    change: change
  };
});