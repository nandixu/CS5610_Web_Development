const path = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    compress: true,
    disableHostCheck: true,   // That solved it

 }  
};

