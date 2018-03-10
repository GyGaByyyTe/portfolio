const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: 'development',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ],
  // optimization: {
  //   minimize: false,
  //   runtimeChunk: {
  //     name: 'common'
  //   },
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       commons: {
  //         test: /node_modules/,
  //         name: 'common',
  //         chunks: 'initial',
  //         minSize: 1
  //       }
  //     }
  //   }
  // }
};

module.exports = config;
