/**
 * Gulp Config
 */

// Import modules
import Gulp from 'gulp'
import autoPrefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat'
import gulpCssnano from 'gulp-cssnano'
import rename from 'gulp-rename'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import TerserPlugin from 'terser-webpack-plugin'

const sassCompiler = gulpSass(sass)

// Implement functions
function compileAdminJS () {
  return Gulp
    .src('./admin/js/ninja-forms-spn-addon-admin.js')
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'spn-back-[name].min.js'
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
      }, webpack),
    )
    .pipe(Gulp.dest('./dist/admin/'))
}

function compilePublicJS () {
  return Gulp
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
      }, webpack),
    )
    .pipe(Gulp.dest('./dist/public/'))
}

function compilePublicCSS () {
  return Gulp.src('./public/scss/ninja-forms-spn-addon-public.scss')
    .pipe(sassCompiler({
      outputStyle: 'compressed',
      includePaths: [
        './node_modules'
      ]
    }).on('error', sassCompiler.logError))
    .pipe(gulpCssnano())
    .pipe(concat('addon-public.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoPrefixer('last 2 versions'))
    .pipe(Gulp.dest('./dist/public/'))
}

function compileAdminCSS () {
  return Gulp.src('./admin/scss/ninja-forms-spn-addon-admin.scss')
    .pipe(sassCompiler({
      outputStyle: 'compressed',
      includePaths: [
        './node_modules'
      ]
    }).on('error', sassCompiler.logError))
    .pipe(gulpCssnano())
    .pipe(concat('ninja-forms-spn-addon-admin.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoPrefixer('last 2 versions'))
    .pipe(Gulp.dest('./dist/admin/'))
}

function watchFiles () {
  Gulp.watch('./admin/js/**/*.js', compileAdminJS)
  Gulp.watch('./public/js/**/*.js', compilePublicJS)
  Gulp.watch('./public/scss/**/*.scss', compilePublicCSS)
  Gulp.watch('./admin/scss/**/*.scss', compileAdminCSS)
}

const build = Gulp.series(compileAdminJS, compilePublicJS, compilePublicCSS, compileAdminCSS, watchFiles)

// Export
export { compileAdminJS, compilePublicJS, compilePublicCSS, compileAdminCSS, watchFiles as watch, build, build as default }
