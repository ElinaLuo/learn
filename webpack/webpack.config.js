const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const allowCSSSourceMap = false;
const isProd = false;

module.exports = {
  mode: isProd? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        include: [],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              sourceMap: allowCSSSourceMap,
            },
          },
          {
            loader: 'css-loader',
            options: {
              // sourceMap: true,
              autoprefixer: false,
              minimize: isProd,
              sourceMap: allowCSSSourceMap,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}