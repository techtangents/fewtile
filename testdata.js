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

