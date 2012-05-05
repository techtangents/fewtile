require.config({
  paths: {
    "jquery"     : "lib/jquery-1.7.1.min",
    "underscore" : "lib/underscore",
    "ba-resize"  : "lib/jquery.ba-resize.min"
  }
});

require(['jquery', 'guts/top/kickoff'], function($, kickoff) {
  $(document).ready(kickoff);
});
