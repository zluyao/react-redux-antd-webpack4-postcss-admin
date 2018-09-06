var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

function getPath(dir) {
  return path.join(process.cwd(), dir);
}

module.exports = {
  mode: 'none',
  devtool: false,
  entry: {
    'app': './src/client/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: getPath('src'),
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:
        {
          plugins: [
            ['import', {
              libraryName: 'antd',
              style: 'css'
            }]
          ]
        },
      },
      {
        test: /\.attached\.less$/,
        exclude: /\.global\.less$/,
        use: [
          { loader: 'style-loader/useable' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.global\.less$/,
        exclude: /\.attached\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.less$/,
        exclude: [/\.global\.less$/, /\.attached\.less$/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.attached.less', '.global.less', '.less'],
    alias: {
      '$lib': getPath('src/lib'),
      '$res': getPath('src/res'),
      '$components': getPath('src/client'),
    },
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: false,
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: -10,
          name: 'vendors',
        },
      },
    },
  },

};
