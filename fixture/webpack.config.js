var ComponentPlugin = require('../index');
var resolve = require('path').resolve;
module.exports = {
  entry: {
    bundle: './entry.js'
  },
  output: {
    path: resolve('./dist'),
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'component', 'components/component']
  },
  module: {
    loaders: [
      {test: /\.html$|\.htm$/, loader: 'raw'},
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
      new ComponentPlugin({
          // This is equal to: xyz: "[file]"

          // Load xyz field with the xyz-loader
           // scripts: "!babel-loader![file]"

      }, [
          // Lookup paths
          "my-components",
          "components",
          "components/component"
      ]
      )
  ]
};
