const path = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    compress: true,
    public: 'store-client-nestroia1.c9users.io'
  }
};

