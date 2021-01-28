const path = require('path')

module.exports = (_, argv) => {
    return {
        mode: argv.mode,

        entry: ['./src/application.jsx'],

        output: {
            publicPath: '/',
            filename: 'main.js',
            path: path.resolve(__dirname, `dist`)
        },

        resolve: {
            mainFiles: ['index'],
            extensions: ['.js', '.jsx', '.json'],
            alias: {
                component: path.resolve(__dirname, './src/view/component'),
                hook: path.resolve(__dirname, './src/view/hook'),
                utils: path.resolve(__dirname, './src/utils'),
                workspace: path.resolve(__dirname, './src/view/workspace')
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
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        }
    }
}
