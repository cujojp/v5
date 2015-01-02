var gulp = require('gulp');

gulp.task('build', ['startexpress', 'svg', 'scripts-complexity', 'scripts', 'styles']);
