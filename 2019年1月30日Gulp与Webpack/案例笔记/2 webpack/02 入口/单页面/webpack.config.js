module.exports = {
	// 入口 因为这是一个单页面应用程序 所以最终只需要打成一个包即可。
	entry: "./modules/index_main.js",
	// 出口
	output: {
		path: __dirname,
		filename: "aaa.js"
	}
}