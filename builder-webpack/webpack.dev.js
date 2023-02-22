const baseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const path = require("path");
const threadLoader = require("thread-loader");

threadLoader.warmup(
  {
    workers: 2,
    workerParallelJobs: 50,
  },
  [
    // 子进程中需要预加载的 node 模块
    "css-loader",
    "postcss-loader",
    "less-loader",
  ]
);

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
  devtool: "eval",
  experiments: {
    lazyCompilation: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:9527"],
      },
    }),
  ],
};

module.exports = merge(devConfig, baseConfig);
