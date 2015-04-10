var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var rsync = require('gulp-rsync');

var tinylr;
var server = {
  host: 'localhost',
  port: '3000'
};

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

gulp.task('sass', function() {
  return gulp.src('css/main.scss')
  .pipe(sass({
    errLogToConsole: true
  }))
  .pipe(gulp.dest('css/'));
});

gulp.task('watch', function() {
  gulp.watch('css/**/*.scss', ['sass']);
  gulp.watch('js/app/**/*.js', notifyLiveReload);
  gulp.watch('index.html', notifyLiveReload);
  gulp.watch('css/main.css', notifyLiveReload);
});

gulp.task('connect', function() {
  connect.server({
      port:        server.port,
      livereload:  false
  });
});

gulp.task('sassdist', function() {
  return gulp.src('css/main.scss')
  .pipe(sass({
    omitSourceMapUrl: false,
    outputStyle: 'compressed',
    sourceComments: false
  }))
  .pipe(gulp.dest('css/'));
});

// deploy to server
gulp.task('rsync', function() {
  return gulp.src(['index.html','css/main.css','i/**/*','js/**/*'])
    .pipe(rsync({
      root: '.',
      hostname: 'rack01',
      destination: '/home/frue/sites/therues.com/html/'
    }));
});

gulp.task('default', ['livereload', 'sass', 'watch', 'connect']);
