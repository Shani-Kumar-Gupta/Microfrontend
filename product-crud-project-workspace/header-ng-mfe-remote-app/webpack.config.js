const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'headerMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './HeaderModule': './src/app/app.module.ts',
    './HeaderComponent': './src/app/header/header.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
