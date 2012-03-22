define(['guts/view', 'guts/consoleBoard'], function(view, consoleBoard) {
  return function() {
    view.allJobs(consoleBoard());
  };
});