module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass : {
      dist : {
        options : {
          outputStyle : 'compressed',
          sourceMap: true
        },
        files : {
          './dist/css/main.min.css' : './scss/main.scss'
        }
      },
      dev : {
        options : {
          sourceMap: true
        },
        files : {
          './dist/css/main.css' : './scss/main.scss'
        }
      }
    },
    browserify : {
      dist : {
        options : {
          transform : ['es6ify']
        },
        files : {
          './dist/js/main.js' : ['./js/src/main.js']
        }
      }
    },
    concat : {},
    uglify : {
      dist : {
        files : {
          './dist/js/main.min.js' : './dist/js/main.js'
        }
      }
    },
    watch : {
      options : {
        livereload : true
      },
      js : {
        files : './js/src/**/*.js',
        tasks : ['browserify', 'uglify']
      },
      sass : {
        files : './scss/**/*.scss',
        tasks : ['sass']
      },
      pug : {
        files : './lib/views/**/*.pug'
      }
    }
  });

  grunt.registerTask('default', ['sass']);
  grunt.registerTask('dist', ['sass:dist', 'browserify:dist', 'uglify:dist']);
}
