var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    watchify = require('watchify'),
    assign = require('lodash.assign'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

/* 样式 */

gulp.task('styles', function() {
    style('src/app.scss', 'static/css');
});

function style(file, path){
    return gulp.src(file)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path))
        .pipe(reload({ stream:true }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(path))
        // .pipe(notify({ message: 'Styles complete' }));
}

/* 图片 */
gulp.task('img', function() {
    return gulp.src('src/*/img/*',{base:'src/*/img'})
        .pipe(rename({dirname: ''}))
        // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('static/img'))
        .pipe(reload({ stream:true }))
        // .pipe(notify({ message: 'img complete' }));
});


/* 逻辑 */
gulp.task('scripts', function() {
    return gulp.src('src/entry.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('static/js/'))
        .pipe(reload({ stream:true }))
        // .pipe(notify({ message: 'Scripts complete' }));
});

/* 构建 */
gulp.task('dist', function() {
    gulp.start('styles');
    gulp.start('img');
    gulp.start('scripts');
});


/*browser浏览器自动刷新*/
gulp.task('serve', ['styles', 'img', 'scripts'], function() {
    /*browserSync({
        server: {
            baseDir: "./"
        }
    });*/
    browserSync({

        proxy: "localhost:3010",
        port: 3011,
        ui: {
            port: 3012
        },
        serveStatic: ['public','./views']
    });

    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch('src/**/img/*', ['img']);
    gulp.watch(['src/**/*.js', 'src/**/*.vue'], ['scripts']);
    gulp.watch('/views/**/*.html', reload);
});

