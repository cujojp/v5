var gulp = require('gulp');
var svg = require('gulp-svg-sprites');
var plumber = require('gulp-plumber');
var handleErrors = require('../utils/handleErrors');
var filelog = require('gulp-filelog');
var notify = require('gulp-notify');

gulp.task('svg', function () {
  gulp.src(['./public/svg/icons/**/*.svg', '!./public/svg/patterns/*.svg'])
    .pipe( filelog() )
    .pipe( svg({
      mode: "symbols",
      preview: false,
      svg: {
        symbols: "icons.svg"
      }
    }))
    .pipe(gulp.dest('./public/svg' ));
});
