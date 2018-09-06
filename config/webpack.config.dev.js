var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// var webpackBundleAnalyzer = require('webpack-bundle-analyzer');

var config = require('./webpack.config');

function getPath(dir) {
  return path.join(process.cwd(), dir);
}

module.exports = merge(config, {
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    path: getPath('dist'),
    chunkFilename: 'js/chunks/[id].js',
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: getPath('config/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/chunks/[id].css',
    }),
    // new webpackBundleAnalyzer.BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
  ],
});
