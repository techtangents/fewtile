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
