const gulp         = require('gulp'),
      server       = require('gulp-server-livereload'),
      sass         = require('gulp-sass'),
      prefix       = require('gulp-autoprefixer'),
      useref       = require('gulp-useref'),
      gulpif       = require('gulp-if'),
      uglify       = require('gulp-uglify'),
      minifyCss    = require('gulp-csso'),
      sourcemaps   = require('gulp-sourcemaps');


// server
gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(server({
            livereload: true,
            open: true
        }));
});

// styles
gulp.task('styles', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'));
});

// build
gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('public'));
});

// watch
gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('webserver','watch'));
