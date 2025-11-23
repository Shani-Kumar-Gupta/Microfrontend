const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'todoListingMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './TodoListingModule': './src/app/app.module.ts',
    './TodoListingComponent': './src/app/todo-listing/todo-listing.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

