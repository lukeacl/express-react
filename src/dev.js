const webpack = require("webpack");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackDevMiddleware = require("webpack-dev-middleware");

const config = require("../client/webpack.config.js");

const compiler = webpack(config);

exports.dev = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
});
exports.hot = webpackHotMiddleware(compiler);
