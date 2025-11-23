const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'footerMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './FooterModule': './src/app/app.module.ts',
    './FooterComponent': './src/app/footer/footer.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

