var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');

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

gulp.task("dev", function() {
    gulp.watch("./scss/**.scss", ['dist', 'demo']);
});

