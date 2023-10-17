const DEV_MODE = process.env.BUILD_MODE === 'development';

module.exports = {
  env: {
    browser: true
  },
  plugins: ['prettier'],
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': 'off',
    'no-constructor-return': 'off',
    'class-methods-use-this': 'off',
    'no-console': DEV_MODE ? 'off' : ['warn'],
    'no-debugger': DEV_MODE ? 'off' : ['warn']
  },
  parserOptions: {
    ecmaVersion: 13
  }
};
