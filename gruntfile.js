module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass : {
      options: {
        sourceMap: true
      },
      dist : {
        files : {
          './dist/main.css' : './scss/main.scss'
        }
      }
    },
    concat : {
      dist : {
        files : {
          './dist/main.js' : './js/*.js'
        }
      }
    },
    uglify : {
      dist : {
        files : {
          './dist/main.min.js' : './dist/main.js'
        }
      }
    }
  });

  grunt.registerTask('default', ['sass']);
  grunt.registerTask('dist', ['sass', 'concat', 'uglify']);
}
