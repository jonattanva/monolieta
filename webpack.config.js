const path = require('path')

module.exports = (_, argv) => {
	return {
        mode: argv.mode,

		entry: [
			'./src/application.jsx'
        ],

		output: {
            publicPath: '/',
            filename: 'main.js',
            path: path.resolve(__dirname, `./dist`)
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
				loader: 'babel-loader',
				exclude: /node_modules/
			}]
        }
	}
}
