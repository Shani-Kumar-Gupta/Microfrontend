const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'productCreateUpdateMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductFormModule': './src/app/app.module.ts',
    './ProductFormComponent': './src/app/product-form/product-form.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

