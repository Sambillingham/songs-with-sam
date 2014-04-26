"use strict";
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

gulp.task('lint', function() {
    gulp.src('public/js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
    gulp.src('sass/{*.sass,*.scss}')
        .pipe(plumber())
        .pipe(sass({ style: 'expanded', lineNumbers : true }))
        .pipe(plumber.stop())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(rename('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    gulp.src(['public/js/vendor/jquery-1.11.0.min.js', 'public/js/vendor/jquery.transit.min.js', 'public/js/main.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js/dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('public/js/dist'));
});

gulp.task('watch', function() {
    gulp.watch('public/js/*.js', ['lint', 'scripts']);
    gulp.watch('sass/**/{*.sass,*.scss}', ['sass']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['lint', 'scripts', 'sass']);
