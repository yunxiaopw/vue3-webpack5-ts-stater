const baseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const path = require("path");

const devConfig = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    hot: true,
    open: true,
    port: "9527",
  },
  stats: "errors-only",
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:9527"],
      },
    }),
  ],
};

module.exports = merge(devConfig, baseConfig);
