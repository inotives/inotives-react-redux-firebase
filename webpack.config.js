// webpack.config.js
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATHS = {
  src_dir: __dirname + '/src',
  node_dir: __dirname + '/node_modules',
  bower_dir: __dirname + '/bower_components',
  lib_dir: __dirname + '/libs',
  style_dir: __dirname + '/src/styles',
  img_dir: __dirname + '/public/images',
  dist_dir: __dirname + '/dist'
}
const HTML_GENERATOR_OPTIONS = {
    title: "ReactAppBasic",
    template: "views/index.ejs", // custom template
    inject: 'body' // inject all scripts tag to body
}

const config = {
  context: PATHS.src_dir,
  entry: {
    app: './index.js'
  },
  output: {
    path: PATHS.dist_dir,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, include: PATHS.src_dir,
        use: [
          { loader: 'babel-loader', options: { presets: [ ['es2015', { modules: false }] ] } }
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"] // equate to: styleLoader(cssLoader(sassLoader('source')))
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/, include: PATHS.img_dir,
        use: [
          {loader: "url-loader?limit=1000&name=images/img_[hash].[ext]" } // convert the images that is <10k to base64 string
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(HTML_GENERATOR_OPTIONS),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js'
    }),
    new ExtractTextPlugin('bundle.css')
  ]
}

module.exports = config
