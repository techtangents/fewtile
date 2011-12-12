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
  $.getJSON("http://pickles/api/json?tree=jobs[name,color]")
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

var hack = {};

function setFail(id) {
  var tm = hack.tm;
  var n = tm.graph.getNode(id);
  n.data = failData;
  var l = tm.labels.getLabel(id);
  var jl = $(l).find("td");
  jl.removeClass('passNode');
  jl.addClass('failNode'); 
  tm.refresh();
};

function setPass(id) {
  var tm = hack.tm;
  var n = tm.graph.getNode(id);
  n.data = passData;
  var l = tm.labels.getLabel(id);
  var jl = $(l).find("td");
  jl.removeClass('failNode');
  jl.addClass('passNode'); 
  tm.refresh();
};

function init(){
  var json = {
    data: {},
    id: "root",
    name: "tiles",
    children: [
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      pass(),
      fail(),
      fail(),
      pass(),
      pass(),
      pass(),
      fail()
    ]
  }; 

  var tm = new $jit.TM.Squarified({
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
  });

  $.resize.delay=10;

  tm.loadJSON(json);
  tm.refresh();
  hack.tm = tm;

}
