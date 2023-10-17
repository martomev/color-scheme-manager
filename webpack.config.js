const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { title, version, author } = require('./package.json');

const DEV_MODE = process.env.BUILD_MODE === 'development';

const today = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1.
  const day = currentDate.getDate().toString().padStart(2, '0');

 return `${year}-${month}-${day}\n`;
}

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
  plugins: [
    new ESLintPlugin(),
    new webpack.BannerPlugin({
      banner: [title, `v${version}`, today(), ...Object.keys(author).map((key) => author[key])].map((item) => `${item}\n`).join('')
    })
  ],
  devtool: DEV_MODE ? 'inline-source-map' : false,
  devServer: {
    port: 8000 // Set the desired port number here
  },
  optimization: {
    minimize: !DEV_MODE,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          mangle: false,
          compress: {
            drop_debugger: !DEV_MODE,
            drop_console: !DEV_MODE
          },
          output: {
            comments: 'some'
          }
        }
      })
    ]
  }
};
