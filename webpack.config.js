const path = require('path');
module.exports = {
  mode: 'development',
  entry: './app/app.ts',
  output: {
    filename: 'anathema.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '/')
    },
    open: true,
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' }
    ]
  },
};
