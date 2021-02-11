const fs = require('fs')
const path = require('path')
const SizePlugin = require('size-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (_, argv) => {
    return {
        mode: argv.mode,

        entry: ['./src/application.jsx'],

        devtool: argv.mode !== 'production' && 'eval-source-map',

        output: {
            publicPath: '/',
            filename: 'main.js',
            path: path.resolve(__dirname, `dist`)
        },

        resolve: {
            mainFiles: ['index'],
            extensions: ['.js', '.jsx', '.json'],
            alias: {
                component: path.resolve(__dirname, './src/component'),
                hook: path.resolve(__dirname, './src/hook'),
                library: path.resolve(__dirname, './src/library'),
                util: path.resolve(__dirname, './src/util'),
                workspace: path.resolve(__dirname, './src/workspace')
            }
        },

        devServer: {
            compress: true,
            overlay: {
                warnings: true,
                errors: true
            },
            contentBase: path.join(__dirname, 'public')
        },

        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename]
            }
        },

        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(jsx|js)$/i,
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    },
                    exclude: /node_modules/
                }
            ]
        },

        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: './public/font',
                        to: './font'
                    }
                ]
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: './public/image',
                        to: './image'
                    }
                ]
            }),
            new HtmlPlugin({
                template: './public/index.html',
                filename: './index.html'
            }),
            new CleanWebpackPlugin() /*,
            new SizePlugin()*/
        ]
    }
}
