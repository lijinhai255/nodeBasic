console.log("加载工具模块", 6)
define(function(require, exports, module) {
	console.log(8)
	// 向外提供一系列的工具函数
	// 格式化函数
	function format(tpl, dic) {
		// 返回一个被格式化之后的字符串
		return tpl.replace(/<%(\w+(\.\w+)*)%>/g, function(match, $1) {
			// 将$1以.分割
			var pathArr = $1.split(".");
			// 定义变量 引用dic 防止dic的地址发生变化
			var result = dic;
			// 开始循环每一层级 除了最后一层之外
			for (var i = 0; i < pathArr.length - 1; i++) {
				result = result[pathArr[i]];
			}
			return result[pathArr[i]];
		})
	}
	module.exports.format = format;
})