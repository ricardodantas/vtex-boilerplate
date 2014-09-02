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
      main: ['build'],
      css_converted: ["src/assets/css/**/*.css"]
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
    coffeelint: {
      options: {
        'coffeescript_error': {
          'level': 'error'
        },
        'no_trailing_whitespace': {
          'level': 'error'
        },
        'camel_case_classes': {
          'level': 'error'
        }
      },
      app: ['src/assets/coffeescript/*.coffee']
    },

    'sass-convert': {

      options: {
        indent: 2,
        from: 'css',
        to: 'scss'
      },
      files: {
        filePrefix: '_',
        src: ['src/assets/css/**/*.css'],
        dest: './src/assets/scss/custom/'
      },
    },

    sass: {
      dev: {
        options: {
          sourcemap: "auto",
          update: true,
          debugInfo: true,
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/assets/scss',
          src: ['*.scss'],
          dest: 'build/assets/css/',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          sourcemap: "none",
          update: false,
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/assets/scss',
          src: ['*.scss'],
          dest: 'build/assets/css/',
          ext: '.css'
        }]
      }
    },
    // compass: {
    //   dist: {
    //     options: {
    //       sassDir: 'src/assets/scss/',
    //       cssDir: 'build/assets/css/',
    //       imagesDir: 'src/assets/img/',
    //       environment: 'production'
    //     }
    //   }
    // },
    csscss: {
      options: {
        colorize: true,
        verbose: true,
        outputJson: false,
        minMatch: 5,
        compass: true
      },
      dist: {
        src: ['src/assets/scss/**/*.scss']
      }
    },
    csslint: {
      strict: {
        options: {
          import: false,
          important: true,
          'adjoining-classes': false,
          ids: false,
          'empty-rules':false,
          'zero-units': false,
          'duplicate-properties': true,
          'universal-selector': false,
          'box-sizing':false
        },
        src: ['build/assets/css/**/*.css']
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
          src: ['*.js', ],
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
    webfont: {
      icons: {
        src: 'src/assets/img/icons/*.svg',
        dest: 'build/assets/fonts',
        destCss: 'src/assets/scss',
        options: {
          syntax: 'bootstrap',
          font: 'x-icon',
          engine: 'node',
          stylesheet: 'scss',
          relativeFontPath: '../fonts',
          templateOptions: {
            classPrefix: 'x-icon-',
            mixinPrefix: 'x-icon-'
          }
        }
      }
    },
    casperjs: {
      options: {
        async: {
          parallel: false
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
        tasks: ['coffee', 'coffeelint']
      },
      compass: {
        options: {
          livereload: false
        },
        files: ['src/assets/scss/**/*.scss'],
        tasks: ['compass', 'csslint', 'styledocco']
      },
      images: {
        files: ['src/assetsimg/**/*.{png,jpg,gif}'],
        tasks: ['sprite', 'imagemin']
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
    build: ['clean', 'sprite', 'sass:dev', 'csscss', 'csslint', 'coffee', 'coffeelint', 'imagemin', 'uglify', 'styledocco', 'webfont'],
    css2scss: ['sass-convert','clean:css_converted'],
    test: ['connect:server_test', 'casperjs'],
    server_test: ['connect:server_test:keepalive'],
    doc: ['styledocco'],
    'bower': ['bower'],
    "default": ['build', 'connect:server_test:keepalive', 'watch'],
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