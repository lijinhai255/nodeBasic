define(function(require, exports, module) {
	// 添加视图函数
	MVC.addView("header", function(M) {
		// 第一步 获取容器
		var $dom = $("#header");
		// 第二步 获取数据
		var data = M.get("header");
		// 第三步 定义模板
		var tpl = [
			
		].join("");
		console.log(tpl);

		// 第四步 定义变量
		// 第五步 格式化
		// 第六步 填充容器
		// 第七步 返回容器
	});
	// 添加控制器函数
	MVC.addCtrl("header", function(M, V) {
		// 此时交互中就出现了发送ajax这个事情
		$.ajax({
			url: "/data/header.json",
			data: "",
			type: "get",
			dataType: "json",
			success: function(data) {
				// 数据已经请求回来了 加入到模型层
				M.add("header", data);
				// 数据已经存入模型层 此时可以通知V层创建视图了
				var $dom = V.create("header");

			}
		})
	});
});