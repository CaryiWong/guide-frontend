var webpack = require('webpack');
var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var clientServerParams = process.argv[3];
var clientServerConfig = {
    '-t': 'http://connect-island.1900lab.com/v1/',
    '-p': 'http://connect-boat.yi-gather.com/v1/',
    '-bd': 'http://connect-bd.rather.im/v1/'
};


var clientServerUrl = clientServerConfig[clientServerParams] || clientServerConfig['-p'];

var path = require('path');

module.exports = {
    context: __dirname + '/app/scripts/',
    devtool: false,
    entry: {
        'main': [
            './main.js'
        ],
        'login': [
            './login.js'
        ],
        'vendor': [
            'es5-shim',
            'es5-shim/es5-sham',
            'jquery',
            'imports?$=jquery!./lib/pintuer'
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist/scripts"),
        publicPath: "/scripts/",
        filename: '[name]-[hash].bundle.js'
    },
    resolveLoader: {
        modulesDirectories: [__dirname + '/node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                plugins: [
                    "transform-es3-property-literals",
                    "transform-es3-member-expression-literals",
                    "transform-es2015-modules-simple-commonjs"
                ],
                loader: 'babel?presets[]=stage-0&plugins[]=transform-runtime'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /.(woff|eot|ttf|svg)(\?\-?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=10000'
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loaders: ['es3ify-loader']
            }
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('style', 'css!sass'),
            scss: ExtractTextPlugin.extract('style', 'css!sass'),
            js: 'babel?presets[]=stage-0&plugins[]=transform-runtime'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            'process.env.REQUEST_URL': JSON.stringify(clientServerUrl),
        }),
        new webpack.ProvidePlugin({
            'Promise': 'exports?global.Promise!es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
            'device': 'modules/device'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].js',
            chunks: ['app']
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles/[name]-[hash]_bundle.css'),
        // html plugin should auto
        new HtmlWebpackPlugin({
            filename: path.resolve('dist', 'index.html'),
            chunks: ['polyfill','vendor', 'main'],
            template: path.resolve('.html', 'index.html')
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve('dist', 'login.html'),
            chunks: ['polyfill','vendor','login'],
            template: path.resolve('.html', 'login.html')
        })
    ],
    resolve: {
        alias: {
            jQuery: 'jquery',
            components: path.resolve('app', 'scripts/components'),
            modules: path.resolve('app', 'scripts/modules'),
            api: path.resolve('app', 'scripts/api'),
            vuexx: path.resolve('app', 'scripts/vuexx'),
            views: path.resolve('app', 'scripts/views'),
            config: path.resolve('app', 'scripts/config'),
            server: path.resolve('app', 'scripts/server'),
            styles: path.resolve('app', 'styles')
        },
        modulesDirectories: [__dirname + '/node_modules'],
        extensions: ['', '.js', '.scss', '.vue']
    }
}
