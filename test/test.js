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
var x = fs.readdirSync('t').filter(endsWith('.js')).map(removeSuffix('js')).map(prepend('../test/t/'));
var assert = require('chai').assert;

requirejs(x, function() {
  for(var i = 0; i < arguments.length; i++) {
    arguments[i](assert);
  }  
});
