var createController = function(board, source, initialWait, period) {

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

  var modeActive = function(mode) {
    return mode === "active"; 
  };

  var modeName = function(mode) {
    return mode === "no jobs" ? source.noJobsName : mode;
  };

  var diffStates = function(a, b) {
    var modeA = a.mode;
    var modeB = b.mode;

    var tileDiffs = diff(a.tiles, b.tiles, eq);

    var activeA = modeActive(modeA);
    var activeB = modeActive(modeB);

    var nameA = modeName(modeA);
    var nameB = modeName(modeB);

    if (activeA) {
       if (activeB) { 
         return tileDiffs; 
       } else {
         return tileDiffs.concat([{key: nameB, action: "add", value: nameB}]); 
       }
    } else { 
       if (activeB) {
         return [{key: nameA, action: "remove", value: nameA}].concat(tileDiffs);
       } else if (modeA !== modeB) {
         return [{key: nameA, action: "remove", value: nameA}, {key: nameB, action: "add", value: nameB}];
       }
    }
  };

  var mkState = function(mode, tiles) {
    return {mode: mode, tiles: tiles};
  };

  var updateUi = function(diffs) {
    _.each(diffs, function(x) {
      board[x.action](x.key, x.value);
    });
    board.refresh();
  };

  var update = function(oldState, mode, tiles) {
    var newState = mkState(mode, tiles);
    var diffs = diffStates(oldState, newState, eq);
    updateUi(diffs);
    pollSoon(newState);
  };

  var poll = function(oldState) {
    return function() {
      $.getJSON(source.url)
        .done(function(data, textStatus, jqXHR) {
          var tiles = source.handle(data);
          var mode = _.isEmpty(tiles) ? "no jobs" : "active"; 
          update(oldState, mode, tiles);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          update(oldState, "disconnected", {}); 
        });
    };
  };

  var pollSoon = function(oldState) {
    setTimeout(poll(oldState), period);
  };

  var initialState = mkState("loading", {});
  setTimeout(poll(initialState), initialWait);
};
