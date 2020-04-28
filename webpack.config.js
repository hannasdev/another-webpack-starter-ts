const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const SHARED_ENV = {}

const DEV_ENV = {
  PORT: 3000,
  HOST: 'localhost',
}

module.exports = env => {
  const inDevelopment = env.mode === 'development'
  const inProduction = env.mode === 'production'

  return {
    devServer: {
      host: DEV_ENV.HOST,
      port: DEV_ENV.PORT,
      hot: inDevelopment,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: inDevelopment,
      open: true,
      publicPath: '/',
      contentBase: path.resolve(__dirname, 'dist'),
    },
    devtool: inDevelopment ? 'eval-source-map' : false,
    entry: [
      '@babel/polyfill',
      'whatwg-fetch',
      'react-hot-loader/patch',
      path.resolve(__dirname, 'polyfills.js'),
      path.join(__dirname, '/src/index.tsx'),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'babel-loader',
        },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader',
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader',
          options: {
            fallback: require.resolve('file-loader'),
            limit: 10000,
          },
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, './src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      path: inProduction ? path.resolve('dist') : undefined,
      filename: inDevelopment ? 'static/js/bundle.js' : 'static/js/[name].[hash:8].js',
      chunkFilename: inDevelopment ? 'static/js/[name].chunk.js' : 'static/js/[name].[hash:8].chunk.js',
    },
    mode: inDevelopment ? 'development' : 'production',
    plugins: [
      new HTMLWebpackPlugin(
        Object.assign(
          {},
          {
            template: './public/index.html',
            filename: './index.html',
            inject: 'body',
          },
          inProduction
            ? {
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
              }
            : undefined,
        ),
      ),
      env.analyze ? new BundleAnalyzerPlugin() : () => {},
      inDevelopment ? new webpack.HotModuleReplacementPlugin() : () => {},
      inDevelopment ? new webpack.DefinePlugin({ ...SHARED_ENV }) : new webpack.DefinePlugin(SHARED_ENV),
    ],
    performance: {
      hints: inProduction ? false : 'warning',
    },
  }
}
