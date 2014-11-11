module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    srcFiles: ["src/purs/**/*.purs", "bower_components/**/src/**/*.purs"],

    psc: {
      options: {
        modules:
          [ "Techtangents.Fewtile.Fewtile"
          , "Techtangents.Fewtile.Struct.Size"
          , "Techtangents.Fewtile.Struct.Style"
          ]
      },
      all: {
        src: ["<%=srcFiles%>"],
        dest: "dist/purs/Fewtile.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-purescript");
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask("default", ["psc:all"]);

};
