const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        // 'react-hot-loader/patch',
        // // activate HMR for React
        //
        // 'webpack-dev-server/client?http://localhost:8080',
        // // bundle the client for webpack-dev-server
        // // and connect to the provided endpoint
        //
        // 'webpack/hot/only-dev-server',
        // // bundle the client for hot reloading
        // // only- means to only hot reload for successful updates

        './index.js'
        // the entry point of our app
    ],
    output: {
        filename: 'bundle.js',
        // the output bundle

        path: resolve(__dirname, 'dist'),

        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, 'src'),

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        // enable HMR on the server

        contentBase: resolve(__dirname, 'dist'),
        // match the output path

        publicPath: '/'
        // match the output `publicPath`
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                include: [
                    resolve(__dirname, 'src')
                ],
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            importLoader: 1,
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                            //localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            //sourceMap: true,
                        }
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: [
                    resolve(__dirname, 'src')
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],
};
