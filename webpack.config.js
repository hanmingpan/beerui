var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    //入口文件
    entry: {
        app: './src/entry.js'
    },
    output: {
        //发布路径
        // path: 'assets',
        //发布路径前缀
        // publicPath: '/assets/',
        //发布文件名
        filename: '[name].js'
    },
    resolve: {
        alias: {
            //定义常用地址前缀
            src: path.join(__dirname, "src")
        }
    },
    plugins: [
        //提取样式文件
        new ExtractTextPlugin("[name].css"),
        //提取公共部分
        //new CommonsChunkPlugin('common.js', 5),
        //压缩，混淆
        new webpack.optimize.UglifyJsPlugin(
            {
                mangle: {
                    except: ['$super', '$', 'exports', 'require']
                }
            }
        )

    ],
    devtool: "source-map",
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            {test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer', 'resolve-url', 'sass?sourceMap']},
            {test: /\.css$/, loaders: ['style', 'css']},
            //小于8kb图片以base64形式插入
            {test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=8192"},
            {test: /\.(woff|eot|svg|ttf)$/, loader: 'url?limit=100000'}
        ]
    }
}