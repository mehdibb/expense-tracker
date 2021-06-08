/* eslint-disable */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PATH_SOURCE = path.join(__dirname, '../src');
const PATH_DIST = path.join(__dirname, '../dist');

module.exports = env => {
  const environment = env.environment;
  
  return {
    mode: environment,

    devServer: {
      contentBase: PATH_DIST,
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
      overlay: {
        errors: true,
        warnings: true,
      }
    },
    
    entry: [
      path.join(PATH_SOURCE, './index.tsx'),
    ],

    output: {
      path: PATH_DIST,
      filename: 'js/[name].[contenthash].js',
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  corejs: 3,
                }],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties"
              ]
            },
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"],
        },
      ],
    },

    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(PATH_SOURCE, './index.html'),
      }),
      new CleanWebpackPlugin()
    ],
  };
};