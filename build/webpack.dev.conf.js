var config = require('../config')
var webpack = require('webpack')
    // 合并webpack文件
var merge = require('webpack-merge')
var utils = require('./utils')
    // 配置文件
var baseWebpackConfig = require('./webpack.base.conf')
    // webpack操作html的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
// 当改变了源码，不用刷新浏览器也能看到效果，失败了会自动刷
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
        baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
    })
    // 对独立的css文件做了编译
module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // eval-source-map is faster for development
    // 方便我们开发时使用的
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // 编译后生成的文件名，inject会将生成的文件名插入到相关的文件中
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
})