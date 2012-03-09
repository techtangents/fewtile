var createBoard = function(elementId, duration, animate, clickUrl, jollyRoger) {
  var graphOptions = {
    Label: {
      orientation: 'h',
      overridable: true
    },
    Canvas: {
      useCanvas: false,
      withLabels: false
    },
    Edge: {
      lineWidth: 20
    },
    injectInto: elementId,
    titleHeight: 0,
    animate: animate,
    offset: 0,
    cushion: false,
    duration: duration,
    onCreateLabel: function(domElement, node) {
      var tile = $(domElement);
      var span = $("<span>" + node.name + "</span>");
      tile.append(span);
      var data = node.data;
      tile.addClass(data.cssClass);
      tile.resize(function() {
        span.textfill();
      });
      if (data.clickable !== false) {
        tile.css('cursor', 'pointer');
        tile.click(function() {
          window.open(clickUrl + node.name);
        });
      }
      setTimeout(function() {
        span.textfill(); 
      }, 0);
    }
  };  
  
  var json = {
    data: {},
    id: "/",
    name: "",
    children: []
  };
  
  var tm = new $jit.TM.Squarified(graphOptions);
  tm.loadJSON(json);
  tm.refresh();
 
  var styles = {
    pass: {
      "$area": 10,
      "cssClass": "passNode",
      clickable: true
    },
    fail: {
      "$area": 100,
      "cssClass": "failNode",
      clickable: true
    },
    disabled: {
      "$area": 5,
      "cssClass": "disabledNode",
      clickable: true
    },
    building: {
      "$area": 10,
      "cssClass": "buildingNode",
      clickable: true
    },
    failed_rebuilding: {
      "$area": 100,
      "cssClass": "buildingNode",
      clickable: true
    },
    "No jobs": {
      "$area": 100,
      "cssClass": "noJobsNode",
      clickable: false
    },
    "All jobs passing": {
      "$area": 100,
      "cssClass": "allJobsPassingNode",
      clickable: false
    },
    loading: {
      "$area": 100,
      "cssClass": "loadingNode",
      clickable: false
    }
  };

  styles[jollyRoger] = {
    "$area": 100,
    "cssClass": "jollyRogerNode",
    clickable: false
  };

  var allClasses = (function() {
    var r = [];
    _.each(styles, function(x) {
      r.push(x.cssClass);
    });
    return r;
  })(); 

  var setClass = function(element, clz) {
    _.each(allClasses, function(x) {
      element.removeClass(x);
    });
    element.addClass(clz);
  };

  var change = function(id, state) {
    var s = styles[state];
    var n = tm.graph.getNode(id);
    if (n === undefined) throw "Node not found: " + id;
    n.data = s;
    var l = $(tm.labels.getLabel(id));
    setClass(l, s.cssClass);
  };

  var createNode = function(node) {
    var g = tm.graph;
    g.addNode(node);
    g.addAdjacence(g.getNode("/"), node);
  };

  var add = function(id, style) {
    var n = {
      id: id,
      name: id,
      children: [],
      data: styles[style]
    };
    createNode(n);
  };

  var remove = function(nodeId) {
    var g = tm.graph;
    g.removeAdjacence("/", nodeId);
    g.removeNode(nodeId); 

    tm.labels.disposeLabel(nodeId);
    //wtf? thejit is crazy. Without this 'delete' statement, if a label of the same name is recreated, no 'onCreateLabel' is fired... because the label already exists
    delete tm.labels.labels[nodeId];
  };

  var refresh = function() {
    tm.refresh();
  };

  add("loading", "loading");
  refresh();

  var resize = function(width, height) {
    tm.canvas.resize(width, height);
  };

  return {
    add: add,
    remove: remove,
    change: change,
    refresh: refresh,
    resize: resize
  };
};

