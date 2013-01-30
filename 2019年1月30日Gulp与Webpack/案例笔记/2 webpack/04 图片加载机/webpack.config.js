module.exports = {
	entry: "./modules/main.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(jpg|gif|png|jpeg|svg)$/,
				loaders: "url-loader?limit=40960"
			}
		]
	}
}