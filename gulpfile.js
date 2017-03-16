
////////////////////////////////
		//Setup//
////////////////////////////////

// Plugins
var gulp = require('gulp'),
      pjson = require('./package.json'),
      gutil = require('gulp-util'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      del = require('del'),
      plumber = require('gulp-plumber'),
      pixrem = require('gulp-pixrem'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      exec = require('child_process').exec,
      runSequence = require('run-sequence'),
      browserSync = require('browser-sync'),
      babel = require('gulp-babel'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer');


// Relative paths function
var pathsConfig = function (appName) {
  this.app = "./" + (appName || pjson.name);

  return {
    app: this.app,
    templates: this.app + '/templates',
    css: this.app + '/static/css',
    sass: this.app + '/static/sass',
    fonts: this.app + '/static/fonts',
    images: this.app + '/static/images',
    js: this.app + '/static/js',
  }
};

var paths = pathsConfig();
console.log(paths);

////////////////////////////////
		//Tasks//
////////////////////////////////

// Styles autoprefixing and minification
gulp.task('styles', function() {
  return gulp.src(paths.sass + '/project.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber()) // Checks for errors
    .pipe(autoprefixer({browsers: ['last 2 version']})) // Adds vendor prefixes
    .pipe(pixrem())  // add fallbacks for rem units
    .pipe(gulp.dest(paths.css))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano()) // Minifies the result
    .pipe(gulp.dest(paths.css));
});

// Javascript downgrading and minification
gulp.task('compile', ['build'], function() {
  return browserify({entries: paths.js + '/build/index.js', debug: true, requirements:['numbro']})
    .bundle()
    .pipe(source('simvis.min.js'))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(plumber()) // Checks for errors
    .pipe(gulp.dest(paths.js));
});

// Javascript downgrading and minification
gulp.task('build', function() {
  return gulp.src([paths.js + '/src/*/*.jsx', paths.js + '/src/*.jsx'])
    .pipe(babel({presets: ['es2015', 'stage-0', 'react']}))
    .pipe(plumber()) // Checks for errors
    .pipe(gulp.dest(function(file) {
      var dir = file.base.split("/");
      return paths.js + '/build' + (dir[dir.length - 1] == 'src' ? '' : '/' + dir[dir.length - 1])
    }));
});

// Image compression
gulp.task('imgCompression', function(){
  return gulp.src(paths.images + '/*')
    .pipe(imagemin()) // Compresses PNG, JPEG, GIF and SVG images
    .pipe(gulp.dest(paths.images))
});

// Run django server
gulp.task('runServer', function() {
  exec('$PYTHON_PATH manage.py runserver', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

// Browser sync server for live reload
gulp.task('browserSync', function() {
    browserSync.init(0
      [paths.css + "/*.css", paths.js + "/*.js", paths.templates + '/*.html'], {
        proxy:  "localhost:8000"
    });
});

// Default task
gulp.task('default', function() {
    runSequence(['styles', 'imgCompression'], 'compile', 'runServer', 'browserSync');
});

////////////////////////////////
		//Watch//
////////////////////////////////

// Watch
gulp.task('watch', ['default'], function() {
  gulp.watch(paths.sass + '/*.scss', ['styles']);
  gulp.watch([paths.js + '/src/*.jsx', paths.js + '/src/*/*.jsx'], ['compile']);
  gulp.watch(paths.images + '/*', ['imgCompression']);
  gulp.watch('templates/*.html');
});
