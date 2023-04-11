const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development", // It can also be production
    entry: {
        main: path.resolve(__dirname, "src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.bundle.js", // using static name
        // OR
        // using entry name, sets the name to main, as specific in the entry object.
        filename: "[name].[contenthash].js",
        clean: true,
        assetModuleFilename: "[name][ext]",
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: "Testing html file",
            filename: "index.html",
            template: path.resolve(__dirname, "src/template.html"),
        }),
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: "asset/resource" },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-env"] },
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'] // include eslint-loader
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],

    },
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "build"),
        },
        port: 5001, // default is often 8080
        open: true,
        hot: true,
        watchFiles: [path.resolve(__dirname, 'src')],
    },
};