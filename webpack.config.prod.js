import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false, //List of bundling files
    entry: './src/index',
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), //optimize the order of the files bundled
        new webpack.DefinePlugin(GLOBALS), //define variables to use on production
        new ExtractTextPlugin('styles.css'), //extract css on different files
        new webpack.optimize.DedupePlugin(), //Eliminate duplicate packages
        new webpack.optimize.UglifyJsPlugin() //Minify our Javascript
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap")},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};
