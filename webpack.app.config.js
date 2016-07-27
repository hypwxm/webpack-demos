var path = require("path");
var webpack =require("webpack");
// 引用这个plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle2.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // 使用这个plugin，这是最简单的一个配置，更多资料可到github查看
        new HtmlWebpackPlugin({
            title: 'zhufeng-react',
            template: './build/index.html',
        })
    ],
    module: {
        
        loaders: [
            {
                //这里指定了使用babel-loader来解析js文件，但是并没有告诉babel应该如何来解析，所以我们需要创建一个babelrc配置文件
                test:/\.js$/,
                loader: "babel-loader",
                
                //打包的时候不包含以下模块
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css/,
                loader: "style!css"
            },
            {
                test: /\.less/,
                loader: 'style!css!less'
            }
        ]
    },
    devtool: false,
    //刚才我们看到，在运行webpack-dev-server的时候，后面带了一串参数，这里我们可以使用devServer字段统一在webpack.config.js文件里面维护。
    devServer: {

        //指定静态文件目录，虚拟的
        publicPath: "/static/",

        //指定打开网页加载的文件目录
        contentBase: "build",
        port: "8000",

        // ** webpac-dev-server支持Hot Module Replacement，即模块热替换,
        // ** 在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。
        // ** 使用HMR功能也有两种方式：命令行方式和Node.js API。
        hot: true,
        // ** 在inline模式下：一个小型的webpack-dev-server客户端会作为入口文件打包，这个客户端会在后端代码改变的时候刷新页面。
        inline: true,
        progress: true,
        stats: {colors: true},
        proxy: [
            {
                path: /^\/api\/(.*)/,
                target: "http://localhost:8080/",
                
                changeOrigin: true
            }
        ]
    },
    resolve: {
        //extension 不用在require或是import的时候加文件后缀
        extensions: ["", ".js", ".css", ".less", ".jsx", ".json"],
        //alias 配置别名，加快webpack构建的速度
        alias: []
    }
};