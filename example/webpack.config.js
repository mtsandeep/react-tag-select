/*eslint-disable no-var */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var fs = require('fs');
var path = require('path');

//ReactTagSelect: path.join(__dirname, '..', 'src/index.js')
module.exports = {

  devtool: 'inline-source-map',

  entry: {
    main: __dirname + '/src/main.js'
  },

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    alias: {
      'ReactTagSelect': path.join(__dirname, '..', 'src')
    }
  }
};
