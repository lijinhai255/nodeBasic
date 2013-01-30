module.exports = {
	entry: "./main.js",
	output: {
		path: __dirname,
		filename: "./bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass)$/,
				loaders: "style-loader!css-loader!sass-loader"
			}
		]
	}
}