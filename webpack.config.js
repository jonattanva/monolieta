const path = require('path')

module.exports = (env) => {
	return {
		mode: env.production ? 'production' : 'development',
		entry: [
			'./src/application.jsx'
		],
		output: {
            publicPath: '/',
            filename: 'main.js',
            path: path.resolve(__dirname, `./public`)
        },
        devServer: {
            contentBase: path.resolve(__dirname, './public')
        },
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [ __filename ]
            }
        },
		module: {
			rules: [{
				test: /\.css$/i,
                use: ['style-loader', 'css-loader']
			}, {
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/
			}]
		}
	}
}