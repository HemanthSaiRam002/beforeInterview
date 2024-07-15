const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
const webpack = require("webpack");

module.exports = {
    entry: './src/index.tsx',
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        historyApiFallback: true,
        port: 3001,
        hot: false,
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ModuleFederationPlugin({
            name: 'products',
            filename: 'remoteEntry.js',
            exposes: {
                './Products': './src/Products'
            },
            remotes:{
                "shell":"shell@http://localhost:3000/remoteEntry.js"
            },
            shared: {
                ...deps,
                react: { singleton: true, requiredVersion: deps.react, eager: true },
                'react-dom': { singleton: true, requiredVersion: deps['react-dom'], eager: true },
            }
        })
    ]
}