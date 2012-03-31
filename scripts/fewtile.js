require.config({
  paths: {
    "jquery"     : "lib/jquery-1.7.1.min",
    "underscore" : "lib/underscore"
  }
});

require(['jquery', 'guts/kickoff'], function($, kickoff) {
  $(document).ready(kickoff);
});
