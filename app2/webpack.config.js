const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('@module-federation/enhanced').ModuleFederationPlugin;
const path = require('path');

const pkg = require('./package.json');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    server: 'https',
    host: 'localhost.example.com',
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': 'https://localhost.example.com:3001',
    },
  },
  output: {
    publicPath: 'https://localhost.example.com:3002/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      exposes: {
        './Button': './src/Button',
      },
      shared: [{
        react: {
          singleton: true,
          requiredVersion: pkg.dependencies.react,
        }
      },
      {
        'react-dom': {
          singleton: true,
          requiredVersion: pkg.dependencies['react-dom'],
        },
      }
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
