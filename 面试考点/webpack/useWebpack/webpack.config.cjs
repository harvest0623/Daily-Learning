const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main-[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',  // 模板文件
            filename: 'index.html',  // 输出文件名
            inject: 'body'  //  js 插入位置
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index-[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
}