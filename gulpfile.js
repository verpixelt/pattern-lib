
const { parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const fractal = require('./fractal.config.js');
const logger = fractal.cli.console;

const paths = {
  styles: {
    src: 'components/**/*.scss',
    dest: 'public/css',
  },
  stylesGlobal: {
    src: 'assets/scss/**/*.scss',
  }
}

function style() {
  return(
    gulp
      .src([paths.styles.src, paths.stylesGlobal.src])
      .pipe(sassGlob())
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(gulp.dest(paths.styles.dest))
  )
}

function watch() {
  style();
  gulp.watch([
    paths.styles.src,
    paths.stylesGlobal.src], style);
}

function fractalStart() {
  const server = fractal.web.server({
    sync: true
  });

  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

exports.style = style;
exports.default = parallel(fractalStart, watch);