var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    watchify = require('watchify');

// 合并
gulp.task('dist', function() {
    style('./scss/beerui.scss', 'dist');
});
gulp.task('demo', function() {
    style('./demo/demo.scss', 'demo');
});

function style(file, path){
    return gulp.src(file)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(path))
}

gulp.task("default", function() {
    gulp.watch("./scss/**.scss", ['dist', 'demo']);
});

