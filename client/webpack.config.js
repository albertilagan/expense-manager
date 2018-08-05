const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const DIST_DIR = path.join(__dirname, '/dist');
const SRC_DIR = path.join(__dirname, '/src');
const PATHS_TO_CLEAN = [
  'dist',
  'build'
]

const config = {
  entry: path.join(SRC_DIR, 'index.js'),
  output: {
    path: DIST_DIR,
    filename: 'bundled.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(PATHS_TO_CLEAN),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    },
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}

module.exports = config;