const gulp = require('gulp');
const pug = require('gulp-pug');
const path = require('path');

const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const jshint = require('gulp-jshint');

const svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');

const paths = {
  root: './build',
  templates: {
    pages: 'src/templates/pages/*.pug',
    src: 'src/templates/**/*.pug'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'build/assets/styles/'
  },
  images: {
    src: 'src/images/**/*.{jpg,png}',
    dest: 'build/assets/images/'
  },
  svg: {
    src: 'src/images/icons/**/*.svg',
    dest: 'build/assets/images/'
  },  
  fonts: {
    src: 'src/fonts/**/*.*',
    dest: 'build/assets/fonts/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/assets/scripts/'
  }
};

// pug
function templates() {
  return gulp
    .src(paths.templates.pages)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
  return gulp
    .src('./src/styles/styles.scss')
    .pipe(sourcemaps.init())
    // .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: ['node_modules', path.join('src')]
      })
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

// очистка
function clean() {
  return del(paths.root);
}

// JSLint Task
function lint() {
  return gulp
    .src(paths.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}

// webpack
function jsScripts() {
  return gulp
    .src('src/scripts/app.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

var myBuildConfig = Object.create(webpackConfig);
myBuildConfig.mode = 'production';
function jsScriptsBuild() {
  return gulp
    .src('src/scripts/app.js')
    .pipe(gulpWebpack(myBuildConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

let scriptsDev = gulp.series(lint, jsScripts);
let scriptsProd = gulp.series(lint, jsScriptsBuild);

// галповский вотчер
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scriptsDev);
}

// локальный сервер + livereload (встроенный)
function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

//сборка svg спрайта
const config = {
  mode: {
    symbol: {
      sprite: '../sprite.svg',
      example: {
        dest: '../tmp/spriteSvgDemo.html' // демо html
      }
    }
  }
};

function spritesvg() {
  return (
    gulp
      .src(paths.svg.src)
      // минифицируем svg
      .pipe(
        svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      // удалить все атрибуты fill, style and stroke в фигурах
      .pipe(
        cheerio({
          run: function($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
          },
          parserOptions: {
            xmlMode: true
          }
        })
      )
      // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
      .pipe(replace('&gt;', '>'))
      // build svg sprite
      .pipe(svgSprite(config))
      .pipe(gulp.dest(paths.svg.dest))
  );
}

// просто переносим картинки
function images() {
  return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
}

// просто переносим шрифты
function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.spritesvg = spritesvg;
exports.scripts = scriptsDev;

gulp.task(
  'default',
  gulp.series(
    clean,
    gulp.parallel(styles, templates, images, spritesvg, scriptsDev, fonts),
    gulp.parallel(watch, server)
  )
);

gulp.task(
  'dev',
  gulp.series(
    clean,
    gulp.parallel(fonts, styles, templates, images, spritesvg, scriptsDev)
  )
);

gulp.task(
  'prod',
  gulp.series(
    clean,
    gulp.parallel(fonts, styles, templates, images, spritesvg, scriptsProd)
  )
);

gulp.task('spritesvg', gulp.series(
  spritesvg
));
