define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	var format = tools.format;
	// MVC步骤1 添加数据
	MVC.addModel("bg", {
		idx: parseInt(Math.random() * 6),
		arr: ["/images/art/bg1.jpg", "/images/art/bg2.jpg", "/images/art/bg3.jpg", "/images/art/bg4.jpg", "/images/art/bg5.jpg", "/images/art/bg6.jpg"]
	})

	// MVC步骤2 添加创建视图的函数
	MVC.addView("bg", function(M) {
		// 把视图的创建步骤定义在这里
		// 第一步 获取容器
		var $dom = $("#bg");
		// 第二步 获取数据
		// 数据在M层
		var data = M.get("bg");
		console.log(data);
		// 第三步 定义模板
		var tpl = "<ul><%li%></ul>";
		var li_tpl = '<li><img src="<%src%>" alt="" /></li>';
		// 第四步 定义变量
		var html = '';
		var li_html = '';
		// 第五步 格式化
		for (var i = 0; i < data.arr.length; i++) {
			li_html += format(li_tpl, {
				src: data.arr[i]
			})
		}
		html = format(tpl, {
			li: li_html
		})
		// 第六步 填充容器
		$dom.html(html);
		// 第七步 返回容器
		return $dom;
	});
	// MVC步骤3 添加控制器
	MVC.addCtrl("bg", function(M, V) {
		V.create("bg");
	})
});