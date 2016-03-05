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
        filename: "dist/ReactTagSelect.min.js",
        libraryTarget: 'umd',
        library: 'ReactTagSelect'
    }
};
