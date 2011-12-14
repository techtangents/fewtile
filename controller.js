var createController = function(board, initialWait, period) {

  var state = {};

  var colorMap = {
    blue: 'pass',
    red: 'fail',
    grey: 'disabled',
    disabled: 'disabled',
    yellow: "fail",
    blue_anime: "building"
  };

  var massage = function(data) {
    var r = {};
    _.each(data.jobs, function(x) {
      r[x.name] = colorMap[x.color];
      if(!r[x.name]) throw x.color; 
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
      if (left != undefined) {
        if (right != undefined) {
          if (!eq(left, right)) {
            r.push({key: i, action: "change", value: right});
          }
        } else {
          r.push({key: i, action: "remove", value: undefined});
        }
      } else if (right != undefined) {
        r.push({key: i, action: 'add', value: right});
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


  var url = location.protocol + location.hostname + (location.port ? ":" + location.port : "") + "/api/json?tree=jobs[name,color]"

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
