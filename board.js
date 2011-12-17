var createBoard = function(elementId, duration, animate) {

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
      domElement.innerHTML = "<table style='height:100%;width:100%'><tr><td style='vertical-align:middle;width:100%'>" + node.name + "</td></tr></table>";
      var style = domElement.style;
      style.display = '';
      style.cursor = 'pointer';
      /*style.border = '1px solid transparent';
      domElement.onmouseover = function() {
        style.border = '1px solid #9FD4FF';
      };
      domElement.onmouseout = function() {
        style.border = '1px solid transparent';
      };
      */
      $(domElement).addClass(node.data.cssClass);
      $(domElement).find("td").resize(function() {
        $(this).textfill();
      });
      $(domElement).click(function() {
        window.open('/job/' + node.name);
      });
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
      "cssClass": "passNode"
    },
    fail: {
      "$color": "red",
      "$area": 100,
      "cssClass": "failNode"
    },
    disabled: {
      "$color": "#999999",
      "$area": 5,
      "cssClass": "disabledNode"
    },
    building: {
      "$color": "yellow",
      "$area": 25,
      "$cssClass": "buildingNode"
    }
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
  }; 

  var refresh = function() {
    tm.refresh();
  };

  return {
    add: add,
    remove: remove,
    change: change,
    refresh: refresh
  };
};

