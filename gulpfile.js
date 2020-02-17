const gulp = require('gulp');
const { watch } = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('dart-sass');

// ROUTES
const sassRoute = './styles/**/*.scss';

function sassCompile() {
  return gulp.src(sassRoute)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles'));
}

function watchFiles() {
  watch([sassRoute], { ignoreInitial: false }, sassCompile);
}

exports.default = watchFiles;
