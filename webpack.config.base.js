'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        filename: "dist/ReactTagSelect.js",
        libraryTarget: 'umd',
        library: 'ReactTagSelect'
    },
    plugins: [
      new ExtractTextPlugin('dist/style.css', {
        allChunks: true
      })
    ]
};
