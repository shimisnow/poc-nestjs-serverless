const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    main: './apps/login/src/main.ts',
    lambda: './apps/login/src/lambda.ts',
  },
  output: {
    path: path.resolve(__dirname, '../../dist/apps/login/'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()], // Prevent bundling of node_modules
  mode: 'development',
  devtool: 'source-map', // Optional for better debugging
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2020,
        },
      }),
    ],
  },
};
