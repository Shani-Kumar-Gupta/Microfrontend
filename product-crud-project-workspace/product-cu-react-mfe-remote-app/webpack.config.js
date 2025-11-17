const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: { port: 4204 },
  output: { publicPath: 'auto' },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new ModuleFederationPlugin({
      name: 'productCUMFE',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductCUComponent': './src/index.js',
      },
      shared: { react: { singleton: true, eager: true, requiredVersion: false }, 'react-dom': { singleton: true, eager: true, requiredVersion: false } },
    }),
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
};