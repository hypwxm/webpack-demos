var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/index",
    output: {
        filename: "yc.js",
        //publicPath: "http://mycdn.com/",
        path: "./js",
        chunkFilename:"[name].js"
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new ExtractTextPlugin("bundle.css")
    ],
    module: {
        loaders: [
            {
                test: /\.js$/, 
                loader: "babel-loader",
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(png|woff|woff2|ttf|svg|eot)$/,
                loader: "url-loader?limit=100000000"
            }
        ]
    },
    resolve: {
        extensions: ["", ".js"]
    }
};