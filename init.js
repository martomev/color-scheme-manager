const { distribute, serve } = require('./config/webpack.handlers');

const configs = ['script', 'demo'].map((name) =>
  require(`./config/webpack.config`)(name)
);

const init = process.env.BUILD_MODE === 'production' ? distribute : serve;

init(configs);
