var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var recess = require('gulp-recess');
var handleErrors = require('../utils/handleErrors');
var notify = require('gulp-notify');

gulp.task('styles', function () {
  gulp.src('./public/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./public/stylesheets'));
});
