const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    entry: './src/index.tsx',
    devServer: {
        port: 3002,
        hot: true,
        static: {
            directory: path.join(__dirname, "dist")
        },
        historyApiFallback: true
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
        extensions: [".js", ".ts", ".tsx"]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        }),
        new ModuleFederationPlugin({
            name: 'cart',
            filename: 'remoteEntry.js',
            exposes: {
                './Cart': './src/Cart'
            },
            shared: {
                react: { singleton: true, requiredVersion: '^18.3.1', eager: true },
                'react-dom': {
                    singleton: true, requiredVersion: '^18.3.1', eager: true
                }
            }
        })
    ]
}