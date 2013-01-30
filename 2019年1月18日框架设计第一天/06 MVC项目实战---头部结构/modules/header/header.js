define(function(require, exports, module) {
	// 引入工具函数
	var tools = require("modules/tools/tools");
	var format = tools.format;
	// 添加视图函数
	MVC.addView("header", function(M) {
		// 第一步 获取容器
		var $dom = $("#header");
		// 第二步 获取数据
		var data = M.get("header");
		// 第三步 定义模板
		var tpl = [
			'<div class="container">',
				'<div class="top">',
					'<div class="logo"><img src="<%logo%>" alt="" /></div>',
					'<ul><%icon_li_tpl%></ul>',
				'</div>',
				'<ul class="nav"><%nav_li_tpl%></ul>',
			'</div>'
		].join("");
		// 3.1 定义小模板
		var icon_li_tpl = '<li><img src="<%src%>" alt="" /></li>';
		// 3.2 定义小模板
		var nav_li_tpl1 = '<li><a href="<%href%>"><%title%></a></li>';
		var nav_li_tpl2 = '<li><a href="<%href%>"><%title%></a><ul><%dropdown_li_tpl%></ul></li>';
		var dropdown_li_tpl = '<li><a href="<%href%>"><%title%></a></li>';
		// 第四步 定义变量
		var html = "";
		var icon_li_html = "";
		var nav_li_html = "";

		// 第五步 格式化
		// 5.1 先格式化小模板
		data.icon.forEach(function(value, index) {
			icon_li_html += format(icon_li_tpl, {
				src: value.img
			});
		});
		// 5.2 格式化另外一个小模板
		data.nav.forEach(function(value, index) {
			// 因为这里有两个模板 所以要判断各自的适用场景
			// 如果有下拉菜单 就使用模板2 如果没有下拉菜单就使用模板1 
			// 有没有下拉菜单要看value是否有list属性
			if (value.list) {
				// 定义一个临时变量用于装载下拉菜单字符串
				var dropdown_li_html = '';
				// 格式化下拉菜单
				value.list.forEach(function(value) {
					dropdown_li_html += format(dropdown_li_tpl, value);
				});
				nav_li_html += format(nav_li_tpl2, {
					href: value.href,
					title: value.title,
					dropdown_li_tpl: dropdown_li_html
				})
			} else {
				nav_li_html += format(nav_li_tpl1, {
					href: value.href,
					title: value.title
				})
			}
		})
		console.log(icon_li_html);
		console.log(nav_li_html);
		// 格式化最终的大模板
		html = format(tpl, {
			logo: data.logo,
			icon_li_tpl: icon_li_html,
			nav_li_tpl: nav_li_html
		})
		console.log(html)
		// 第六步 填充容器
		$dom.html(html);
		// 第七步 返回容器
		return $dom;
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