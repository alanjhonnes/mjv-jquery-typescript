/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const main = [
    'core-js',
    'whatwg-fetch',
    'jquery',
    './src/index.ts'
];

module.exports = {
    context: process.cwd(), // to automatically find tsconfig.json
    entry: {
        main
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "/",
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif|glb)$/,
                use: [
                    {
                        loader: 'file-loader', options: { outputPath: 'assets', }
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devtool: 'inline-source-map',
    devServer: {
        clientLogLevel: 'warning',
        open: false,
        historyApiFallback: true,
        stats: 'errors-only',
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 8080,
    }
};
