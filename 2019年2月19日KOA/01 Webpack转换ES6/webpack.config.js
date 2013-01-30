module.exports = {
	// 入口
	entry: "./modules/main.js",
	// 出口
	output: {
		path: __dirname,
		filename: "./hahaha.js"
	},
	mode: "development",
	// 加载机
	module: {
		rules: [
			{
				test: /\.es6$/,
				loader: "babel-loader",
				options: {
					presets: ["env"]
				}
			}
		]
	}
	// 插件
}