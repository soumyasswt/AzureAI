const path = require('path');

module.exports = {
  // Your existing Webpack config...
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
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
