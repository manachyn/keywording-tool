const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        //contentBase: './dist'
        contentBase: './',
        host: '0.0.0.0',
    }
});