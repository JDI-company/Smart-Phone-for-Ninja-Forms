/**
 * Gulp Config
 */

// Import modules
import Gulp from 'gulp'
import autoPrefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat'
import gulpCssnano from 'gulp-cssnano'
import rename from 'gulp-rename'
import sass from 'sass'
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

function compileCss () {
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

function watchFiles () {
  Gulp.watch('./admin/js/**/*.js', compileAdminJS)
  Gulp.watch('./public/js/**/*.js', compilePublicJS)
  Gulp.watch('./public/scss/**/*.scss', compileCss)
}

const build = Gulp.series(compileAdminJS, compilePublicJS, compileCss, watchFiles)

// Export
export { compileAdminJS, compilePublicJS, compileCss, watchFiles as watch, build, build as default }
