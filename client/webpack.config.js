const dotenv = require("dotenv-webpack");
const html = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  devtool:
    process.env.NODE_ENV === "development" ? "inline-source-map" : undefined,
  entry: [
    ...(process.env.NODE_ENV === "development"
      ? ["webpack-hot-middleware/client"]
      : []),
    path.join(__dirname, "src", "index.js"),
  ],
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/media/[name].[contenthash].[ext]",
          },
        },
      },
      {
        test: /\.svg/,
        use: "@svgr/webpack",
      },
    ],
  },
  plugins: [
    new dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new html({
      template: path.join(__dirname, "index.html"),
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
    publicPath: "/",
  },
};
