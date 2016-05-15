var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('default', function () {
  console.log('gulp');
});

// static server
var watchFiles = ['./*.html', './app/*.*', './app/**/*.*'];
gulp.task('serve', function () {
  browserSync.init(watchFiles, {server: {baseDir: "./"}});
});
