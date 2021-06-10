/* eslint-disable */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {ProvidePlugin} = require('webpack');

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
          oneOf: [
            {
              test: /\.(js|jsx|ts|tsx)$/,
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
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose": false }],
                    [
                      "babel-plugin-named-asset-import",
                      {
                        loaderMap: {
                          svg: {
                            ReactComponent:
                              "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                          }
                        },
                      }
                    ]
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
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ]
        }
      ],
    },

    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(PATH_SOURCE, './index.html'),
      }),
      new CleanWebpackPlugin(),
        new ProvidePlugin({
           "React": "react",
        }),
    ],
  };
};