const webpack = require("webpack");
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

// eslint-disable-next-line no-unused-vars
module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return merge(
    {
      mode,
      entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
      },
      plugins: [
        new CleanWebpackPlugin(),

        new webpack.ProgressPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            {from: "src/favicon/", to: "favicon"},

            {from: "src/assets/", to: "assets"},
            {from: "src/worker/worker.js", to: "worker.js"}
          ]
        }),
        new HtmlWebpackPartialsPlugin({
          path: path.join(__dirname, './src/common/favicon-meta.html'),
          location: 'favicon-meta',
          inject: true,
          template_filename: ['index.html', 'offline.html', 'notfound.html'],
          options: {
            appName: 'unknown'
          }
        }),
        new HtmlWebpackPlugin({
          title: 'Home | Dusk',
          template: 'src/index.html',
          filename: 'index.html',
          inject: true,
          chunks: ['main','vendor']
        }),
        new HtmlWebpackPlugin({
          title: 'Offilne | Dusk',
          template: 'src/worker/offline.html',
          filename: 'worker/offline.html',
          inject: true,
          chunks: ['main','vendor']
        }),
        new HtmlWebpackPlugin({
          title: '404 | Dusk',
          template: 'src/worker/notfound.html',
          filename: 'worker/notfound.html',
          inject: true,
          chunks: ['main','vendor']
        }),

      ]
    },
    modeConfig(mode)

  );
};
