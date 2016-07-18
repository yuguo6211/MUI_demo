var webpack = require("webpack"),
    PC = require("./project.config"),
    path = require("path"),
    WH = require("./tool/webpack_helper");


module.exports = {
  entry: WH.makeEntry(),
  /*entry: {
    order: './src/js/controller/order/index.js'
  },*/
  output: {
    path: __dirname + '/dist/js',
    filename: "[name].js"
  },
  resolve: {
    alias: {
      'swiper.jquery.min' : 'libs/swiper.jquery.min.js', 
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/, // a regex for matching all files that end in `.vue`
        loader: 'vue'   // loader to use for matched files
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015-loose']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
  ]
}
 
