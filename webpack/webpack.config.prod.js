const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '../src/app.js'),
  ],
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*'],
    alias: {
      containers: path.resolve(__dirname, '../src/containers'),
      components: path.resolve(__dirname, '../src/components'),
      commonComponents: path.resolve(__dirname, '../src/commonComponents'),
      utils: path.resolve(__dirname, '../src/utils'),
      apis: path.resolve(__dirname, '../src/apis'),
      apollo: path.resolve(__dirname, '../src/apollo'),
      models: path.resolve(__dirname, '../src/models'),
      auth: path.resolve(__dirname, '../src/auth'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules/'),
        ],
        include: [
          path.join(__dirname, '../src/'),
        ],
      },
      {
        test: /\.css$/,
        exclude: /.*\.min.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'], // resolve-url-loader may be chained before sass-loader if necessary
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
      {
        test: /\.min.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.png$/,
        use: 'url-loader?prefix=img/&limit=5000',
      },
      {
        test: /\.jpg$/,
        use: 'url-loader?prefix=img/&limit=5000',
      },
      {
        test: /\.gif$/,
        use: 'url-loader?prefix=img/&limit=5000',
      },
      {
        test: /\.(eot|svg|ttf)$/,
        use: 'file-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        use: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])+$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      // (the commons chunk name)
      filename: 'common.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin({
      filename: 'custom-style.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, '../lte'), to: path.resolve(__dirname, '../dist/lte')},
    ]),
  ],
  devtool: 'source-map',
};
