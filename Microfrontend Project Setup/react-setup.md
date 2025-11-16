# React HOST and Remote MFE Setup:

### React Host Application Setup:
* Install create-react-app with React 16 Compatibility<br>
```npx create-react-app@3 react-host```<br>
```cd react-host```<br>
```npm install react@16.14.0 react-dom@16.14.0```

* Add Module Federation Plugin<br>
```npm install @module-federation/webpack-module-federation webpack@5 webpack-cli@4 html-webpack-plugin --save-dev```
```npm uninstall react-scripts```

* Add webpack.config.js
```bash
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: { port: 3000 },
  output: { publicPath: 'auto' },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new ModuleFederationPlugin({
      name: 'reactHost',
      remotes: {
        footerMFE: "footerMFE@http://localhost:3001/remoteEntry.js",
        productFormMFE: "productFormMFE@http://localhost:3002/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};
```

* Update package.json scripts
```bash
{
  "scripts": {
    "start": "webpack serve --open --config webpack.config.js",
    "build": "webpack --config webpack.config.js"
  }
}
```

### React Remote Application Setup:
* Install create-react-app with React 16 Compatibility<br>
```npx create-react-app@3 react-mfe-remote``<br>
```cd react-mfe-remote```<br>
```npm install react@16.14.0 react-dom@16.14.0```

* Add Module Federation Plugin<br>
```npm install @module-federation/webpack-module-federation webpack@5 webpack-cli@4 html-webpack-plugin --save-dev```
```npm uninstall react-scripts```

* Add webpack.config.js
```bash
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: { port: 3001 },
  output: { publicPath: 'auto' },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new ModuleFederationPlugin({
      name: 'footerMFE',
      filename: 'remoteEntry.js',
      exposes: { './FooterComponent': './src/FooterComponent.js' },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};
```

* Update package.json scripts
```bash
{
  "scripts": {
    "start": "webpack serve --open --config webpack.config.js",
    "build": "webpack --config webpack.config.js"
  }
}
```