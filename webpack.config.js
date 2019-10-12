// File: webpack.config.js
const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HelloWorld = require('./src/js/plugins/WebpackSmartDeleteFiles');

const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin")

const env = process.env.NODE_ENV;

module.exports = {

  mode: env == 'production' || env == 'none' ? env : 'development',
  entry: {
    app: [path.resolve(__dirname + '/src/js/app.js'), path.resolve(__dirname + '/src/css/app.css')]
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'assets/js/[name]-[contenthash].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: 'assets/images/[name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  },

  // [...]

  plugins: [
    // [...]
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash].css'
    }),

    // new HelloWorld({
    //   message: '楠哥是大好人',
    //   // 要删除哪个
    //   outputPath: path.resolve(__dirname + '/')
    // })

    new UnusedFilesWebpackPlugin({
      failOnUnused: true
    }),
    // [...]
  ]

};
