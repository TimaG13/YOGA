const gulp         = require('gulp'),
      server       = require('gulp-server-livereload'),
      sass         = require('gulp-sass'),
      prefix       = require('gulp-autoprefixer'),
      concat       = require('gulp-concat'),
      uglify       = require('gulp-uglify-es').default,
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
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'));
});
// js
gulp.task("script", function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/jquery.magnific-popup.min.js',
        'app/js/slick.min.js',
        'app/sass/js/script.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});
// build
gulp.task('build', function () {
    return gulp.src([
        'app/*.html',
        'app/js/app.min.js',
        'app/css/*.css',
        'app/img/*',
        'app/fonts/*'
    ],{base: 'app'})
        .pipe(gulp.dest('public'));
});

// watch
gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
    gulp.watch('app/sass/js/**/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('webserver','watch'));
