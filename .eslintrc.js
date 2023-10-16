module.exports = {
  env: {
    browser: true
  },
  plugins: ['prettier'],
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    // Add any project-specific ESLint rules here
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': 'off',
    'no-constructor-return': 'off',
    'class-methods-use-this': 'off'
  },
  parserOptions: {
    ecmaVersion: 13
  }
};
