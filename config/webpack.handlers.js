const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const osBrowserMap = {
  darwin: 'Google Chrome', // macOS
  win32: 'Chrome', // Windows
  linux: 'google-chrome' // Linux
};

exports.distribute = (config) =>
  new Promise((resolve, reject) => {
    Webpack(config, (err, stats) => {
      if (stats.hasErrors()) {
        reject(new Error('Webpack build failed'));
      } else {
        process.stdout.write(`${stats.toString()}\n`);
        resolve();
      }
    });
  });

exports.serve = async (config) => {
  const compiler = Webpack(config);

  const devServerOptions = {
    historyApiFallback: true,
    static: {
      directory: `dist`
    },
    open: {
      app: {
        name: osBrowserMap[process.platform]
      }
    },
    devMiddleware: {
      writeToDisk: true
    },
    compress: false,
    port: 8000
  };
  const server = new WebpackDevServer(devServerOptions, compiler);

  console.log('Starting server...');
  await server.start();
};
