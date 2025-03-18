const path = require('path');

module.exports = {
  // Your existing Webpack config...
  resolve: {
    fallback: {
        process: require.resolve('process/browser')
      },
    alias: {
      // Add this line to alias `process` to the browser version
      process: require.resolve('process/browser'),
    },
  },
  // Add the following to ensure process is available globally
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
