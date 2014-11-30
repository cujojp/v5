var gulp = require('gulp');
var concat = require('gulp-concat');
var include = require('gulp-include');
var uglify = require('gulp-uglify');
var filelog = require('gulp-filelog');
var notify = require('gulp-notify');

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
