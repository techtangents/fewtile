var createController = function(board, initialWait, period) {

  var state = {};

  var colorMap = {
    blue: 'pass',
    red: 'fail',
    grey: 'disabled',
    disabled: 'disabled',
    yellow: "fail",
    blue_anime: "building",
    yellow_anime: "failed_rebuilding",
    red_anime: "failed_rebuilding"
  };

  var massage = function(data) {
    var r = {};
    _.each(data.jobs, function(x) {
      r[x.name] = colorMap[x.color];
      if(!r[x.name]) throw "Jenkins gave a 'color' value I don't know about: " + String(x.color); 
    });
    return r;
  };
 
  var outerJoin = function(left, right) {
    var r = {};
    _.each(left, function(x, i) {
      r[i] = {left: x};
    });
    _.each(right, function(x, i) {
      r[i] = r[i] || {};
      r[i].right = x;
    });
    return r;
  };

  var diff = function(a, b, eq) {
    var oj = outerJoin(a, b);
    var r = [];
    _.each(oj, function(x, i) {
      var left = x.left;
      var right = x.right;
      var addAction = function(action) {
        r.push({key: i, action: action, value: right});
      };
      if (left !== undefined) {
        if (right !== undefined) {
          if (!eq(left, right)) {
            addAction("change");
          }
        } else {
          addAction("remove");
        }
      } else if (right !== undefined) {
        addAction('add');
      }
    }); 
    return r;
  };

  var eq = function(a, b) {
    return a === b;
  };

  var updateUi = function(diffs) {
    _.each(diffs, function(x) {
      board[x.action](x.key, x.value);
    });
    board.refresh();
  };

  var update = function(newState) {
    var diffs = diff(state, newState, eq);
    state = newState;
    updateUi(diffs); 
    pollSoon();
  };

  var url = "/api/json?tree=jobs[name,color]";
  var poll = function() {
    $.getJSON(url)
      .done(function(data, textStatus, jqXHR) {
        var newState = massage(data);
        update(newState);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        update({}); 
      });
  };

  var pollSoon = function() {
    setTimeout(poll, period);
  };

  setTimeout(poll, initialWait);
};
