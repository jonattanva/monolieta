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

        output: {
            publicPath: '/',
            pathinfo: false,
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, `dist`)
        },

        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
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
                    include: path.resolve(__dirname, 'public'),
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
            new CleanWebpackPlugin(),
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
            })
            /*, new SizePlugin()*/
        ],

        resolve: {
            mainFiles: ['index'],
            extensions: ['.js', '.jsx', '.json'],
            alias: {
                Monolieta: path.resolve(__dirname, './flow-typed/monolieta'),
                component: path.resolve(__dirname, './src/component'),
                hook: path.resolve(__dirname, './src/hook'),
                library: path.resolve(__dirname, './src/library'),
                util: path.resolve(__dirname, './src/util'),
                view: path.resolve(__dirname, './src/view')
            }
        }
    }
}
