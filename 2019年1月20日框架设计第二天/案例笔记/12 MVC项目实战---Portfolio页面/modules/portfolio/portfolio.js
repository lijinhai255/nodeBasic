define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 获取格式化函数
	var format = tools.format;
	// 添加视图
	MVC.addView("portfolio", function(M) {
		// 第一步 获取容器
		var $dom = $("#portfolio");
		// 第二步 获取数据
		var data = M.get("portfolio");
		// 第三步 定义模板
		var tpl = [
			'<div class="container">',
				'<div class="title">',
					'<h2><%title%></h2>',
					'<p class="content"><%content%></p>',
				'</div>',
				'<div class="filter">',
					'<div class="left">FILTER:</div>',
					'<ul><%li_tpl%></ul>',
				'</div>',
				'<ul id="waterfall"></ul>',
			'</div>'
		].join("");
		var li_tpl = '<li><a><%name%></a></li>';
		// 第四步 定义变量
		var html = "";
		var li_html = '';

		// 第五步 格式化
		for (var i in data.filter) {
			li_html += format(li_tpl, {
				name: i
			});
		}
		html = format(tpl, {
			title: data.title,
			content: data.content,
			li_tpl: li_html
		})
		// 第六步 填充容器
		$dom.html(html);
		// 第七步 返回容器
		return $dom;
	})

	MVC.addCtrl("portfolio", function(M, V) {
		$.ajax({
			url: "/data/portfolio.json",
			dataType: "json",
			success: function(data) {
				console.log(data);
				// 数据被请求到 加入模型层
				M.add("portfolio", data);
				// 可以通知视图层去创建视图
				var $dom = V.create("portfolio");
			}
		})
	})
});