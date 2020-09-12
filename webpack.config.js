const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

// eslint-disable-next-line no-unused-vars
module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return merge(
    {
      mode,
      output: {
        filename: "bundle.js"
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true
      }),
      new webpack.ProgressPlugin(),
      new CopyWebpackPlugin({
        patterns: [{from: "src/favicon/", to: "favicon"},
        {from: "src/worker/worker.js", to: "worker"}]

      })
    ]
    },
    modeConfig(mode),

  );
};
