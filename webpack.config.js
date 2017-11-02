const path = require('path');

var WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;

module.exports = {
  entry: './simvis/static/js/src/index.jsx',
  output: {
    path: __dirname + '/simvis/static/js/dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015', 'react']} },
      { test: /\.scss$/, loaders: ["style-loader","css-loader","sass-loader"]}
    ]
  },
  devtool: 'source-map',
  plugins: [
    new WebpackBundleSizeAnalyzerPlugin('./reports/plain-report.txt')
  ]
}
