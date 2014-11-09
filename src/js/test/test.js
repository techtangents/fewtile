var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '../scripts',
  paths: {
    underscore: 'lib/underscore'
  }
});

var removeSuffix = function(suffix) { 
  return function(s) {
    var d = s.length - suffix.length;
    return endsWith(suffix)(s) ? s.substring(0, d - 1) : s;
  };
};

var endsWith = function(suffix) {
  return function(s) {
    var d = s.length - suffix.length;
    return d >= 0 && s.substring(d) === suffix;
  };
};

var prepend = function(prefix) {
  return function(s) {
    return prefix + s;
  };
};

var fs = require('fs');
var assert = require('chai').assert;

var testModules = fs.readdirSync('t').filter(endsWith('.js')).map(removeSuffix('js')).map(prepend('../test/t/'));

for (var i = 0; i < testModules.length; i++) {
  var x = testModules[i];
  requirejs([x], function(module) {
    console.log("Testing: " + x);
    module(assert);
  });
}
