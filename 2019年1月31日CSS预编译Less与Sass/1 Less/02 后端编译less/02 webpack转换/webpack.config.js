module.exports = {
	entry: "./main.js",
	output: {
		path: __dirname,
		filename: "./bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				loaders: "style-loader!css-loader!less-loader"
			}
		]
	}
}