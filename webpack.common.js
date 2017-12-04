const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        //catalogingTool: ['babel-polyfill', './index.js'],
        payPerSecond: ['babel-polyfill', './paypersecond/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: '[name]'
    },
    context: path.resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                importLoader: 1,
                                modules: true,
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                                //localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                //sourceMap: true,
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules/react-voice-components'),
                ],
                use: [
                    'babel-loader',
                ],
                //exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader' },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     title: 'Production'
        // }),
        new ExtractTextPlugin('[name].css')
    ]
};