const webpack = require('webpack');
const { title, version, author } = require('../../package.json');

const today = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1.
  const day = currentDate.getDate().toString().padStart(2, '0');

 return `${year}-${month}-${day}\n`;
}

module.exports = {
  resolve: {
    extensions: ['.js']
  },

  output: {
    filename: 'color-scheme-manager.js',
    libraryTarget: 'commonjs2'
  },
  
  plugins: [
    new webpack.BannerPlugin({
      banner: [title, `v${version}`, today(), ...Object.keys(author).map((key) => author[key])].map((item) => `${item}\n`).join('')
    })
  ]
};
