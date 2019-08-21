const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          'ts-loader',
          {
            loader: 'tslint-loader',
            options: {
              tsConfigFile: path.join(__dirname, 'tsconfig.json'),
              configFile: path.join(__dirname, 'tslint.json')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'example'
    })
  ]
};
