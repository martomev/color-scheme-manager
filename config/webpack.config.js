const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const DEV_MODE = process.env.BUILD_MODE === 'development';

const rootPath = process.cwd();

module.exports = (context) => {
  const contextConfig = require(`./${context}/webpack.config`)

  return {
    mode: process.env.BUILD_MODE,

    entry: `./src/${context}/index.js`,

    output: {
      path: `${rootPath}/dist`,
      ...contextConfig.output
    },

    resolve: contextConfig.resolve,

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        ...contextConfig.module?.rules || []
      ]
    },

    plugins: [
      new ESLintPlugin(),
      ...contextConfig.plugins
    ],

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
    },

    devtool: DEV_MODE ? 'inline-source-map' : false
  }
}