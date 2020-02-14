const gulp = require('gulp'); 
const { watch } = require('gulp');
const sass = require('gulp-sass');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

sass.compiler = require('dart-sass');

// ROUTES
const sass_route = './styles/**/*.scss';
const ts_route = './src/**/*.ts';

function sassCompile() {
  return gulp.src(sass_route)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles'));
}

function tsCompile() {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'));
}

function watchFiles() {
  watch([sass_route], { ignoreInitial: false }, sassCompile);
  watch([ts_route], { ignoreInitial: false }, tsCompile);
}

exports.default = watchFiles;