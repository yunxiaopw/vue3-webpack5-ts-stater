const baseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const prodConfig = {
  mode: "production",
  output: {
    filename: "js/[name]_[contenthash:7].js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: "source-map",
};

module.exports = merge(prodConfig, baseConfig);
