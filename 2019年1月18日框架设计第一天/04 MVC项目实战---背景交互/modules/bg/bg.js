console.log("加载背景模块", 5)
define(function(require, exports, module) {
	console.log(7)
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
		console.log("创建bg视图", "H")
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
		console.log("启动bg控制器", "G");
		// 调用创建视图的方法 它返回了一个jQuery元素
		var $dom = V.create("bg");
		console.log("创建bg视图完毕返回一个jQuery元素", "I");
		// 轮播图交互
		// 获取信号量
		var idx = M.get("bg").idx;
		// 当前显示的应该是 idx 这张图片
		$dom.find("li").eq(idx).show().siblings().hide();
		// 自动轮播
		setInterval(function() {
			idx++;
			if (idx > $dom.find("li").length - 1) {
				idx = 0;
			}
			$dom.find("li").eq(idx).fadeIn(1500).siblings().fadeOut(1500);
		}, 4000)
	});
});