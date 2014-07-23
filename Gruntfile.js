module.exports = function(grunt) {
  var config, environment, errorHandler, name, open, pkg, taskArray, taskName, tasks, verbose, _results;
  pkg = grunt.file.readJSON('package.json');
  environment = process.env.VTEX_HOST || 'vtexcommerce';
  verbose = grunt.option('verbose');
  open = pkg.accountName ? "http://" + pkg.accountName + ".vtexlocal.com.br/?debugcss=true&debugjs=true" : void 0;
  errorHandler = function(err, req, res, next) {
    var errString, _ref, _ref1;
    errString = (_ref = (_ref1 = err.code) != null ? _ref1.red : void 0) != null ? _ref : err.toString().red;
    return grunt.log.warn(errString, req.url.yellow);
  };
  config = {
    clean: {
      main: ['build']
    },
    coffee: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/assets/coffeescript/',
          src: ['**/*.coffee'],
          dest: "build/assets/js/",
          ext: '.js'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/assets/scss/',
          cssDir: 'build/assets/css/',
          imagesDir: 'src/assets/img/',
          environment: 'production'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      main: {
        files: [{
          expand: true,
          cwd: 'build/assets/js/',
          src: ['*.js',],
          dest: 'build/assets/js/',
          ext: '.js'
        }]
      }
    },
    imagemin: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/assets/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/assets/img'
        }]
      }
    },
    sprite: {
      all: {
        src: 'src/assets/img/sprite/*.png',
        destImg: 'build/assets/img/x-sprite.png',
        destCSS: 'src/assets/scss/_x-sprite.scss',
        cssFormat: 'scss'
      }
    },
    casperjs: {
      options: {
        async: {
          parallel: true
        }
      },
      files: ['tests/casperjs/**/*.js']
    },
    connect: {
      server_test: {
        options: {
          // useAvailablePort: true,
          hostname: 'localhost',
          port: 8080,
          base: 'src/',
          open: false
        }
      },
      http: {
        options: {
          hostname: "*",
          open: open,
          port: process.env.PORT || 8080,
          middleware: [
          require('connect-livereload')({
            disableCompression: true
          }), require('connect-http-please')({
            replaceHost: (function(h) {
              return h.replace("vtexlocal", environment);
            })
          }, {
            verbose: verbose
          }), require('connect-tryfiles')('**', "http://portal." + environment + ".com.br:80", {
            cwd: 'build/',
            verbose: verbose
          }), require('connect')["static"]('./build/'), errorHandler
          ]
        }
      }
    },
    styledocco: {
      dist: {
        options: {
          name: 'Vtex Boilerplate'
        },
        files: {
          'docs': 'src/assets/scss'
        }
      }
    },
    watch: {
      options: {
        livereload: 1337
      },
      coffee: {
        files: ['src/assets/coffeescript/**/*.coffee'],
        tasks: ['coffee']
      },
      compass: {
        options: {
          livereload: false
        },
        files: ['src/assets/scss/**/*.scss'],
        tasks: ['compass', 'styledocco']
      },
      images: {
        files: ['src/assetsimg/**/*.{png,jpg,gif}'],
        tasks: ['sprite','imagemin']
      },
      css: {
        files: ['build/css/**/*.css']
      }
      // main: {
      //     files: ['src/templates/**/*.html', 'src/**/*.js', 'src/**/*.css'],
      //     tasks: ['copy']
      // }

    }
  };
  tasks = {
    build: ['clean', 'sprite', 'compass', 'coffee', 'imagemin', 'uglify', 'styledocco'],
    test: ['connect:server_test','casperjs'],
    server_test: ['connect:server_test:keepalive'],
    doc: ['styledocco'],
    "default": ['build', 'connect', 'watch'],
    devmin: ['build', 'min', 'connect:http:keepalive']
  };
  grunt.initConfig(config);
  for (name in pkg.devDependencies) {
    if (name.slice(0, 6) === 'grunt-') {
      grunt.loadNpmTasks(name);
    }
  }
  _results = [];
  for (taskName in tasks) {
    taskArray = tasks[taskName];
    _results.push(grunt.registerTask(taskName, taskArray));
  }
  return _results;
};
