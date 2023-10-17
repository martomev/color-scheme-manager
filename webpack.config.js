const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const DEV_MODE = process.env.BUILD_MODE === 'development';

module.exports = {
  entry: './index.js',
  output: {
    filename: 'color-scheme-manager.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [new ESLintPlugin({})],
  devtool: DEV_MODE ? 'inline-source-map' : false,
  devServer: {
    port: 8000 // Set the desired port number here
  },
  optimization: {
    minimize: !DEV_MODE,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: {
            drop_debugger: !DEV_MODE,
            drop_console: !DEV_MODE
          },
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  }
};
