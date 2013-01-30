define(function(require, exports, module) {
	var tools = require("modules/tools/tools");
	var format = tools.format;
	var Observer = tools.Observer;
	MVC.addView("carousel", function(M) {
		// 第一步 获取容器
		var $dom = $("#carousel");
		// 第二步 获取数据
		var data = M.get("home.carousel");
		console.log(data);
		// 第三步 定义模板
		var tpl = [
			'<div class="container">',
				'<ul class="carousel"><%li_tpl%></ul>',
			'</div>'
		].join("");
		var li_tpl = '<li><img src="<%img%>" alt="" /><p><%intro%></p></li>';
		// 第四步 定义变量
		var html = "";
		var li_html = "";
		// 第五步 格式化
		data.list.forEach(function(value) {
			li_html += format(li_tpl, {
				img: value.src,
				intro: value.intro
			});
		});
		html = format(tpl, {
			li_tpl: li_html
		});
		// 第六步 填充容器
		$dom.html(html);
		// 第七步 返回容器
		return $dom;
	})
	MVC.addCtrl("carousel", function(M, V) {
		// console.log("添加carousel交互");
		// 因为数据是由其它模块请求的 所以无法立即执行 要等请求回来之后通知我 
		// 就将要执行的代码放在一个自定义事件中  等待被触发
		Observer.on("msg", function() {
			V.create("carousel");
		})
	});
});