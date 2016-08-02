module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt-contrib-concat
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    // grunt-contrib-uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: './bin/www'
        }
      },
      prod: {
        options: {
          script: 'path/to/prod/server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'path/to/test/server.js'
        }
      }
    },

    // grunt-mocha-test
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['public/**/*.js']
      }
    },

    // grunt-contrib-jshint  
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'public/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    // grunt-contrib-watch
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'mochaTest']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // this would be run by typing "grunt test" on the command line
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['jshint', 'mochaTest', 'concat', 'uglify', 'express:dev', 'watch']);

};