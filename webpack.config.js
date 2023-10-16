const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, options) => {
  return {
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
    devtool: options.mode === 'development' ? 'inline-source-map' : false,
    devServer: {
      port: 8000 // Set the desired port number here
    }
  };
};
