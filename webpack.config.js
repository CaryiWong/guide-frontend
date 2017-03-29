var webpack = require('webpack');
var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var os = require('os');
var platform = os.type();

function fixPath(path){
    if(platform === 'Windows_NT'){
        path = path.replace(new RegExp('/','g'),"\\")
    }
    return path
}

var path = require('path');
var stylesPath = [
    path.resolve('app/styles'),
    path.resolve('node_modules')
];

module.exports = {
    context: __dirname + fixPath('/app/scripts/'),
    devtool: 'eval',
    entry: {
        main: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            './main.js'
        ],
        login: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            './login.js'
        ],
        vendor: [
            'babel-polyfill',
            'jquery',
            'imports?jQuery=jquery!bootstrap-sass/assets/javascripts/bootstrap/transition',
            'imports?jQuery=jquery!bootstrap-sass/assets/javascripts/bootstrap/dropdown',           
            'imports?jQuery=jquery!bootstrap-sass/assets/javascripts/bootstrap/modal'
        ]
    },
    output: {
        path: path.resolve(__dirname, ".tmp/scripts"),
        publicPath: "/scripts/",
        filename: '[name].bundle.js'
    },
    resolveLoader: {
        modulesDirectories: [__dirname + '/node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                //loader:{
                //    "presets": ["es2015", "stage-0"],
                //    "plugins" : [
                //        "transform-es3-property-literals",
                //        "transform-es3-member-expression-literals",
                //    ]
                //}
                loader: 'es3ify-loader!babel?presets[]=stage-0&plugins[]=transform-runtime'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
                // loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /.(woff|eot|ttf|svg)(\?\-?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    vue: {
        loaders: {
            css: 'style!css!sass',
            scss: 'style!css!sass',
            // scss: ExtractTextPlugin.extract('style', 'css!sass'),
            js: 'babel?presets[]=stage-0&plugins[]=transform-runtime'
        }
    },
    sassLoader: {
        includePaths: stylesPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'exports?global.Promise!es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
            'device': 'modules/device'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            chunks: ['app']
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
        alias: {
            jQuery: 'jquery',
            api: path.resolve('app', 'scripts/api'),
            modules: path.resolve('app', 'scripts/modules'),
            server: path.resolve('app', 'scripts/server'),
            styles: path.resolve('app', 'styles'),
        },
        modulesDirectories: [__dirname + '/node_modules'],
        extensions: ['', '.js', '.scss', '.vue']
    }
}
