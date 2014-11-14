module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    srcFiles: ["src/purs/**/*.purs", "bower_components/**/src/**/*.purs"],

    psc: {
      options: {
        modules:
          [ "Techtangents.Fewtile.Source.ColorMap"

          , "Techtangents.Fewtile.Struct.Pos"
          , "Techtangents.Fewtile.Struct.Rect"
          , "Techtangents.Fewtile.Struct.Shingle"
          , "Techtangents.Fewtile.Struct.Size"
          , "Techtangents.Fewtile.Struct.Style"
          , "Techtangents.Fewtile.Struct.Tile"
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
