const path = require('path');
var WebpackPreBuildPlugin = require('pre-build-webpack');
var WebpackOnBuildPlugin = require('on-build-webpack');

var execSync = require('child_process').execSync
var handlebars = require('Handlebars')
var fs = require('fs-sync')

module.exports = {
  entry: './ssv/ssv/static/js/source/ssv_main.es6',
  output: {
    path: __dirname + '/ssv/ssv/static/js/dist',
    filename: 'ssv.bundle.js',
    libraryTarget: 'var',
    library: "ssv"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.es6$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015']} },
      { test: /\.css$/, loaders: ["style-loader","css-loader"]},
      { test: /\.scss$/, loaders: ["style-loader","css-loader","sass-loader"]},

      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new WebpackPreBuildPlugin(function(stats) {
        var type_requirements = execSync('python ssv/gen_input_requirements.py').toString('utf8');
        var template_path = fs.read('ssv/ssv/static/js/source/ssv_types.json', 'utf8');
        var template = handlebars.compile(template_path);
        var js_out = template({"type_requirements": type_requirements});
        fs.write('ssv/ssv/static/js/source/ssv_types.json', js_out);
    }),
    new WebpackOnBuildPlugin(function(stats) {
        // Move dist to simvis dist folder
        execSync('cp -R ./ssv/ssv/static/js/dist/* ./simvis/static/js/ssv')
    }),
  ],
  watch: true,
  watchOptions: {
    ignored: '**/ssv_types.json'
  }
}
