var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var include = require('gulp-include');
var complexity = require('gulp-complexity');
var uglify = require('gulp-uglify');
var filelog = require('gulp-filelog');
var handleErrors = require('../utils/handleErrors');
var notify = require('gulp-notify');

gulp.task('scripts-complexity', function() {
  gulp.src([
    './public/javascripts/**/*.js',
    '!./public/javascripts/libs/*.js',
    '!./public/javascripts/plugins/*.js',
    '!./public/javascripts/all.js',
    '!./public/javascripts/all.min.js',
    '!./public/javascripts/**/utilities.js',
    '!./public/javascripts/**/index.js',
    '!./public/javascripts/**/*-enums.js',
  ])
  .pipe( plumber( { errorHandler: handleErrors } ) )
  .pipe(complexity({
    breakOnErrors: false,
    maintainability: 120,
    errorsOnly: false,
    cyclomatic: 5,
    halstead: 25               
  }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('./public/javascripts/base/global.js')
      .pipe(include())
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./public/javascripts'))
      .pipe(include())
      .pipe(concat('all.min.js'))
      .pipe(uglify({
        mangle: true
      }))
      .pipe(gulp.dest('./public/javascripts'));
});
