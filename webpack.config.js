const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  /** Entry */
  entry: ['./src/js/index.js', './src/css/index.css'],
  /** Output */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  /** Modules */
  module: {
    rules: [
      /** js via babel */
      { test: /|.js?$/, loader: 'babel-loader' },
      /** html */
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      /** Images */
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/'
            }
          }
        ]
      },
      /** Styles css */
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  /** Plugins */
  plugins: [
    /** extract css */
    new ExtractTextPlugin('./css/index.css'),
    /** auto inject into dist html */
    new HtmlWebpackPlugin({
      template: './src/html/index.html'
    }),
    /** clean up before each pack */
    new CleanWebpackPlugin(['dist'])
  ]
};
