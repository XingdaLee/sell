var path = require('path')
var config = require('../config')
var utils = require('./utils')
    // 项目根目录
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
    // 入口文件
    entry: {
        app: './src/main.js'
    },
    // 输出
    output: {
        // 输出路径
        path: config.build.assetsRoot,
        // 静态资源的绝对路径
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        // 输出的文件名称，name是entry里的app
        filename: '[name].js'
    },
    resolve: {
        // 自动补全文件路径
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        // 别名
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        // 对某个文件找到某个loader去处理，include表示只检查这个路径下的文件，exclude是排除这些文件
        preLoaders: [{
                test: /\.vue$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /node_modules/
            }
        ],
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            // 图片，limit小1KB就编译，否则单独生成一个文件，文件规则是name
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            // 字体文件
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    eslint: {
        // 检查到es6错误时，提供友好的提示和链接
        formatter: require('eslint-friendly-formatter')
    },
    // vue中css处理的方法
    vue: {
        loaders: utils.cssLoaders()
    }
}