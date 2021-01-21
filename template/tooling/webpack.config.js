const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/bundle.tsx',

  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    chunkFilename: 'chunk.[chunkhash].js',
    publicPath: '/',
  },

  devtool: isDev ? 'inline-source-map' : 'source-map',

  mode: process.env.NODE_ENV,

  resolve: {
    modules: [path.resolve('./'), path.resolve('./src'), path.resolve('./src/root'), path.resolve('node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  resolveLoader: {
    modules: [path.resolve('node_modules')],
  },

  plugins: [
    new HtmlPlugin({
      title: 'WhatsUp boilerplate',
      inject: true,
      hash: true,
      cache: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(mp3|ogg|jpg|svg|png)$/,
        use: ['file-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]-[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  devServer: {
    port: 4000,
    historyApiFallback: true,
    filename: 'app.js',
    overlay: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'errors-only',
    hot: true,
  },
}
