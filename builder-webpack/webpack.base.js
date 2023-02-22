const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ESLintPlugin = require("eslint-webpack-plugin");
const threadLoader = require("thread-loader");

threadLoader.warmup(
  {
    workers: 2,
    workerParallelJobs: 50,
  },
  [
    // 子进程中需要预加载的 node 模块
    "vue-loader",
    "babel-loader",
  ]
);
module.exports = {
  entry: path.resolve(__dirname, "../src/index.ts"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".ts", ".tsx", ".vue", ".js", ".json"], // 使用 resolve.extensions 声明自动解析 .ts 后缀文件，这意味着代码如 import "./a.ts" 可以忽略后缀声明，简化为 import "./a" 文件
  },
  cache: {
    type: "filesystem"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|svg|gif)/i,
        type: "asset",
        generator: {
          filename: "images/[name]-[contenthash:7][ext]", // 局部指定输出位置， 防止缓存问题
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb  大于 8kb，asset 选择用 asset/resource 处理它； 小于 8kb，asset 选择用 asset/inline 处理它。
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset",
        generator: {
          filename: "fonts/[name]-[contenthash:7][ext]", // 局部指定输出位置， 防止缓存问题
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb  大于 8kb，asset 选择用 asset/resource 处理它； 小于 8kb，asset 选择用 asset/inline 处理它。
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      title: "webpack-vue3-ts",
    }),
    new ESLintPlugin({ cache: true }),
  ],
};
