const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index.tsx',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        historyApiFallback: true,
        port: 3000,
        hot: true,
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
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin({
            name: "shell",
            filename:"remoteEntry.js",
            remotes: {
                "products": "products@http://localhost:3001/remoteEntry.js",
                "cart": "cart@http://localhost:3002/remoteEntry.js"
            },
            exposes:{
                "./events":"./src/events.ts"
            },
            shared: {
                ...deps,
                react: { singleton: true, requiredVersion: deps.react, eager: true },
                'react-dom': { singleton: true, requiredVersion: deps['react-dom'], eager: true },
            }
        })
    ]
}