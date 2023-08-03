/**
 * Gulp Config
 */

// Import modules
const gulp = require('gulp')
const { src, dest } = require('gulp')
const concat = require('gulp-concat')
const prefix = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const TerserPlugin = require('terser-webpack-plugin')

// Implement functions
function compileAdminJS () {
  return gulp
    .src('./admin/js/ninja-forms-spn-addon-admin.js')
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'spn-back-end.min.js'
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ]
        },
        optimization: {
          minimize: true,
          minimizer: [new TerserPlugin()],
          splitChunks: {
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
              }
            }
          }
        }
      }),
      webpack
    )
    .pipe(gulp.dest('./dist/admin/'))
}

function compilePublicJS () {
  return gulp
    .src('./public/js/ninja-forms-spn-addon-public.js')
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'spn-front-[name].min.js'
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ]
        },
        optimization: {
          minimize: true,
          minimizer: [new TerserPlugin()],
          splitChunks: {
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
              }
            }
          }
        }
      }),
      webpack
    )
    .pipe(gulp.dest('./dist/public/'))
}

function compileCss () {
  return src('./public/scss/ninja-forms-spn-addon-public.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(concat('addon-public.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(prefix('last 2 versions'))
    .pipe(dest('./dist/public/'))
    .pipe(browserSync.stream())
}

function watchFiles () {
  gulp.watch('./admin/js/**/*.js', compileAdminJS)
  gulp.watch('./public/js/**/*.js', compilePublicJS)
  gulp.watch('./public/scss/**/*.scss', compileCss)
}

const build = gulp.series(compileAdminJS, compilePublicJS, compileCss, watchFiles)

// Export
exports.compileAdminJS = compileAdminJS
exports.compilePublicJS = compilePublicJS
exports.compileCss = compileCss

exports.watch = watchFiles
exports.build = build
exports.default = build
