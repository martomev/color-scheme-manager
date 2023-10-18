const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { title, description } = require('../../package.json');

const DEV_MODE = process.env.BUILD_MODE === 'development';

module.exports = {
  resolve: {
    extensions: ['.js', '.vue']
  },

  output: {
    filename: 'demo.js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: DEV_MODE,
      __VUE_PROD_DEVTOOLS__: DEV_MODE
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      templateParameters: {
        title,
        description
      },
      template: './src/demo/index.html',
      filename: 'index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        preserveLineBreaks: false
      }
    })
  ]
};
