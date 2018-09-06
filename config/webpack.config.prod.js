var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var config = require('./webpack.config');

function getPath(dir) {
  return path.join(process.cwd(), dir);
}

module.exports = merge(config, {
  output: {
    publicPath: '/',
    filename: 'js/[name]-[chunkhash:8].js',
    path: getPath('dist'),
    chunkFilename: 'js/chunks/[id]-[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name]-[chunkhash:8].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name]-[chunkhash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false,
        },
        mangle: {
          keep_fnames: true,
        },
        compress: {
          warnings: false,
          drop_console: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      title: 'React Demo',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      template: getPath('config/index.html'),
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css|svg)$/,
      threshold: 1024 * 30,
      minRatio: 0.8,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[chunkhash:8].css',
      chunkFilename: 'css/[id]-[chunkhash:8].css',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
  ],
});
