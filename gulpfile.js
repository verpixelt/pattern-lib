
const { series, src, dest } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const fractal = require('./fractal.config.js');
const logger = fractal.cli.console;
const concat = require('gulp-concat');

const paths = {
  styles: {
    src: 'components/**/*.scss',
    dest: 'public/css',
  },
  stylesGlobal: {
    src: 'assets/scss/**/*.scss',
  },
  javascriptFiles: {
    src: 'components/**/*.js',
    dest: 'public/js',
  }
}

function style() {
  return src([paths.styles.src, paths.stylesGlobal.src])
    .pipe(sassGlob())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.styles.dest))
}

function js() {
  return src(paths.javascriptFiles.src)
    .pipe(concat('application.js'))
    .pipe(dest(paths.javascriptFiles.dest));
}

function watch(cb) {
  style();
  gulp.watch([
    paths.styles.src,
    paths.stylesGlobal.src], style);
  gulp.watch(paths.javascriptFiles.src, js);
  cb()
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

exports.js = js;
exports.style = style;
exports.default = series(fractalStart, watch);