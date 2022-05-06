'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');

function clean() {
  return del('dist');
}

function moveHTML() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
}

function buildCSS() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.src('src/css/reset.css'))
    .pipe(gulp.dest('dist/css'));
}

function watch() {
  gulp.watch(['src/scss/*.scss', 'src/index.html'], gulp.series(clean, moveHTML, buildCSS));
}

exports.watch = watch
exports.default = gulp.series(clean, moveHTML, buildCSS);