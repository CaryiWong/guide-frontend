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
var publicServerConfig = {
    '-t': 'http://connect.1900lab.com/v1/',
    '-p': 'http://connect.rather.im/v1/'
};

var passportServerConfig = {
    '-t': 'https://test-passport.yi-gather.com/',
    '-p': 'https://passport.yi-gather.com/'
};

var publicServerUrl = publicServerConfig[clientServerParams] || publicServerConfig['-p'];
var clientServerUrl = clientServerConfig[clientServerParams] || clientServerConfig['-p'];
var passportServerUrl = passportServerConfig[clientServerParams] || passportServerConfig['-p'];

var path = require('path');
var stylesPath = [
    path.resolve('app/styles'),
    path.resolve('node_modules')
];

module.exports = {
    context: __dirname + '/app/scripts/',
    devtool: false,
    entry: {
        'app': [
            './app.js'
        ],
        'login': [
            './login.js'
        ],
        'share': [
            './share.js'
        ],
        'vendor': [
            'jquery',
            'imports?jQuery=jquery!bootstrap-sass/assets/javascripts/bootstrap/transition',
            'imports?jQuery=jquery!bootstrap-sass/assets/javascripts/bootstrap/dropdown',
            'imports?jQuery=jquery!bootstrap-sass/assets/javascripts/bootstrap/modal'
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
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('style', 'css!sass'),
            scss: ExtractTextPlugin.extract('style', 'css!sass'),
            js: 'babel?presets[]=stage-0&plugins[]=transform-runtime'
        }
    },
    sassLoader: {
        includePaths: stylesPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            'process.env.REQUEST_URL': JSON.stringify(clientServerUrl),
            'process.env.PUBLIC_URL': JSON.stringify(publicServerUrl),
            'process.env.PASSPORT_URL': JSON.stringify(passportServerUrl)
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
            chunks: ['vendor', 'app'],
            template: path.resolve('.html', 'index.html')
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve('dist', 'login.html'),
            chunks: ['login'],
            template: path.resolve('.html', 'login.html')
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve('dist', 'share.html'),
            chunks: ['share'],
            template: path.resolve('.html', 'share.html')
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
