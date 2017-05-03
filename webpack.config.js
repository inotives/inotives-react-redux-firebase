// webpack.config.js
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"] // equate to: styleLoader(cssLoader(sassLoader('source')))
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/, include: PATHS.img_dir,
        use: [
          {loader: "url-loader?limit=1000&name=images/img_[hash].[ext]" } // convert the images that is <10k to base64 string
        ]
      },
      // { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/font_[hash].[ext]' },
      // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/font_[hash].[ext]' },
      // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?&name=fonts/font_[hash].[ext]' },
      // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/font_[hash].[ext]' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(HTML_GENERATOR_OPTIONS),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js'
    })
  ]
}

module.exports = config
