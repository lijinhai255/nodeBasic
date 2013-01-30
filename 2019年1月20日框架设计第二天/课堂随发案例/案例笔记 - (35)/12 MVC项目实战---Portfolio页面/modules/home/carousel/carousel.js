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
				'<ul class="cirs"><li id="leftBtn"></li><%cir_tpl%><li id="rightBtn"></li> </ul>',
				'<p class="title"><%title%></p>',
			'</div>'
		].join("");
		var li_tpl = '<li><img src="<%img%>" alt="" /><p><%intro%></p></li>';
		// 第四步 定义变量
		var html = "";
		var li_html = "";
		var cir_html = "";
		// 第五步 格式化
		data.list.forEach(function(value) {
			li_html += format(li_tpl, {
				img: value.src,
				intro: value.intro
			});
			cir_html += "<li></li>";
		});
		html = format(tpl, {
			li_tpl: li_html,
			cir_tpl: cir_html,
			title: data.title
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
			// 创建视图并得到视图容器元素
			var $dom = V.create("carousel");
			// 获取所有的小圆点和左右按钮
			var $lis = $dom.find(".cirs li");
			// 获取图片li
			var $img_lis = $dom.find(".carousel li");
			// 为了方便区分两者 于是转为数组
			var arr = [].slice.call($lis);
			// 将第一项取出
			var first = arr.shift();
			// 将最后一项取出
			var last = arr.pop();
			// 第一个小圆点要有样式 
			$(arr[0]).addClass("active");
			// 第一张图片要显示
			$img_lis.eq(0).siblings().fadeOut()
			// 此时数组中只有四项 这些项都是与图片对应的小圆点
			arr.forEach(function(value, index) {
				// 循环绑定事件
				value.onclick = function() {
					idx = index;
					$(this).addClass("active").siblings().removeClass("active");
					$img_lis.eq(index).fadeIn(500).siblings().fadeOut(500)
				}
			});
			// 定义信号量
			var idx = 0;
			// 左按钮点击事件
			first.onclick = function() {
				idx--;
				if (idx < 0) {
					idx = arr.length - 1;
				}
				$(arr[idx]).addClass("active").siblings().removeClass("active");
				$img_lis.eq(idx).fadeIn(500).siblings().fadeOut(500)
			}
			// 右按钮点击事件
			last.onclick = function() {
				idx++;
				if (idx > arr.length - 1) {
					idx = 0;
				}
				$(arr[idx]).addClass("active").siblings().removeClass("active");
				$img_lis.eq(idx).fadeIn(500).siblings().fadeOut(500)
			}
		});
	});
});