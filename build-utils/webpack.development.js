module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // Copy empty ServiceWorker so install doesn't blow up

  ],
  devtool: 'source-map'
});
