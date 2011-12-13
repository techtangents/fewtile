var passData = {
  "$color": "green",
  "$area": 10,
  "cssClass": "passNode"
};

var failData = {
  "$color": "red",
  "$area": 100,
  "cssClass": "failNode"
};

var i = 0;
function fail() {
  i++;
  return {
    id: "tile" + String(i),
    name: "tile" + String(i),
    data: failData
  };
}

function pass() {
  i++;
  return {
    id: "tile" + String(i),
    name: "tile" + String(i),
    data: passData
  };
}

var poll = function() {
  $.getJSON(location.origin + "/api/json?tree=jobs[name,color]")
    .done(function(data, textStatus, jqXHR) {
      console.log("success");
      console.log(arguments);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("failed");
      console.log(arguments);
    });  
};

poll();

var state = {};

function setFail(id) {
  var tm = state.tm;
  var n = tm.graph.getNode(id);
  n.data = failData;
  var l = tm.labels.getLabel(id);
  var jl = $(l).find("td");
  jl.removeClass('passNode');
  jl.addClass('failNode'); 
  tm.refresh();
};

function setPass(id) {
  var tm = state.tm;
  var n = tm.graph.getNode(id);
  n.data = passData;
  var l = tm.labels.getLabel(id);
  var jl = $(l).find("td");
  jl.removeClass('failNode');
  jl.addClass('passNode'); 
  tm.refresh();
};

var addNode = function(node) {
  var tm = state.tm;
  var g = state.tm.graph;
  g.addAdjacence(g.getNode("/"), node);
  tm.refresh();
};

var removeNode = function(nodeId) {
  var tm = state.tm;
  var g = state.tm.graph;
  g.removeAdjacence("/", nodeId);
  g.removeNode(nodeId); 
  tm.labels.disposeLabel(nodeId);
  tm.refresh();
};

var addPass = function() {
  addNode(pass());  
};

var graphOptions = {
    Label: {
      size: 40,
      orientation: 'v',
      overridable: true
    },
    Canvas: {
      useCanvas: true,
      withLabels: false
    },
    injectInto: 'infovis',
    titleHeight: 0,
    animate: true,
    offset: 0,
    cushion: true,
    duration: 400,
    onCreateLabel: function(domElement, node){
        domElement.innerHTML = "<table style='height:100%;width:100%'><tr><td style='vertical-align:middle;'>" + node.name + "</td></tr></table>";
        var style = domElement.style;
        style.display = '';
        style.cursor = 'default';
        style.border = '1px solid transparent';
        domElement.onmouseover = function() {
          style.border = '1px solid #9FD4FF';
        };
        domElement.onmouseout = function() {
          style.border = '1px solid transparent';
        };
        $(domElement).addClass(node.data.cssClass);
        $(domElement).find("td").resize(function() {
          $(this).textfill();
        });
    }
};

var makeGraph = function() {
  var json = {
    data: {},
    id: "/",
    name: "",
    children: []
  };

  var tm = new $jit.TM.Squarified(graphOptions);
  tm.loadJSON(json);
  tm.refresh();
  return tm;
};

function init(){
  $.resize.delay=10;
  state.tm = makeGraph();
}
