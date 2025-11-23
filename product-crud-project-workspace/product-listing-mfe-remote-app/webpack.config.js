const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'productListingMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductListingModule': './src/app/app.module.ts',
    './ProductListingComponent': './src/app/product-listing/product-listing.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
