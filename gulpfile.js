/**
 * Gulp Config
 */

// Import modules
const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// Implement functions
function compileAdminJS () {
  return gulp
    .src('./admin/js/ninja-forms-spn-addon-admin.js')
    .pipe(
      webpackStream({
        mode: 'development',
        output: {
          filename: '[name].min.js'
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
        },
        plugins: [
          new CompressionPlugin()
        ]
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
        mode: 'development',
        output: {
          filename: '[name].min.js'
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
        },
        plugins: [
          new CompressionPlugin()
        ]
      }),
      webpack
    )
    .pipe(gulp.dest('./dist/public/'))
}

function watchFiles () {
  gulp.watch('./admin/js/**/*.js', compileAdminJS)
  gulp.watch('./public/js/**/*.js', compilePublicJS)
}

const build = gulp.series(compileAdminJS, compilePublicJS, watchFiles)

// Export
exports.compileAdminJS = compileAdminJS
exports.compilePublicJS = compilePublicJS

exports.watch = watchFiles
exports.build = build
exports.default = build
