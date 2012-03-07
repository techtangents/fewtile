var createBoard = function(elementId, duration, animate, clickUrl) {

  $.resize.delay=1000;

  var graphOptions = {
    Label: {
      size: 40,
      orientation: 'h',
      overridable: true
    },
    Canvas: {
      useCanvas: true,
      withLabels: false
    },
    injectInto: elementId,
    titleHeight: 0,
    animate: animate,
    offset: 0,
    cushion: true,
    duration: duration,
    onCreateLabel: function(domElement, node) {
      var box = $("<div style='display: table;height:100%; width:100%;'></div>");
      $(domElement).append(box);

      var text = $("<div class='cellVis' style='display: table-cell;vertical-align:middle;'><span>" + node.name + "</span></div>");
      box.append(text);
      var data = node.data;
      text.addClass(data.cssClass);
      text.resize(function() {
        $(this).textfill();
      });
      if (data.clickable !== false) {
        box.css('cursor', 'pointer');
        box.click(function() {
          window.open(clickUrl + node.name);
        });
      }
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
      "$color": "green",
      "$area": 10,
      "cssClass": "passNode",
      clickable: true
    },
    fail: {
      "$color": "red",
      "$area": 100,
      "cssClass": "failNode",
      clickable: true
    },
    disabled: {
      "$color": "#999999",
      "$area": 5,
      "cssClass": "disabledNode",
      clickable: true
    },
    building: {
      "$color": "yellow",
      "$area": 10,
      "$cssClass": "buildingNode",
      clickable: true
    },
    failed_rebuilding: {
      "$color": "orange",
      "$area": 100,
      "$cssClass": "buildingNode",
      clickable: true
    },
    "No jobs": {
      "$color": "red",
      "$area": 100,
      "$cssClass": "noJobs",
      clickable: false
    },
    "No groups": {
      "$color": "red",
      "$area": 100,
      "$cssClass": "noJobs",
      clickable: false
    },
    "All jobs passing": {
      "$color": "green",
      "$area": 100,
      "$cssClass": "allJobsPassing",
      clickable: false
    },
    disconnected: {
      "$color": "red",
      "$area": 100,
      "$cssClass": "disconnected",
      clickable: false
    },
    loading: {
      "$color": "blue",
      "$area": 100,
      "cssClass": "disabledNode",
      clickable: false
    },
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
    var l = tm.labels.getLabel(id);
    var td = $(l).find("td");
    setClass(td, s.cssClass);
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

