const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/app.js",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
             }
        ]
    },
    // plugin
    plugins:[
        // HTML webpack
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ]
}