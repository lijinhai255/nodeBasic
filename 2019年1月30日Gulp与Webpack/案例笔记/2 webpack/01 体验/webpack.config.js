// 这个文件是配置文件
module.exports = {
	// 入口
	entry: "./modules/main",
	// 出口
	output: {
		// 文件夹所在 该配置必须是绝对路径
		path: __dirname,
		// 文件名称
		filename: "aaa.js"
	}
}