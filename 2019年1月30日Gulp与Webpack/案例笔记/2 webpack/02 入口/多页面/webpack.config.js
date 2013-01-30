module.exports = {
	// entry入口
	entry: {
		// key表示最终生成的打包文件的名
		// value表示入口文件地址
		hahahaha: "./modules/index_main.js",
		nihao: "./modules/portfolio_main.js"
	},
	// output出口
	output: {
		path: __dirname,
		filename: "[name].js" // [name] 表示占位符 name表示文件名 具体指的就是entry的每一个key
	}
}