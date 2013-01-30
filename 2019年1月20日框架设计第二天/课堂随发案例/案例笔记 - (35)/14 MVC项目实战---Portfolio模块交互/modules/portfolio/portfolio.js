define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 获取格式化函数
	var format = tools.format;
	var getMinIdx = tools.getMinIdx;
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
				name: i.toUpperCase()
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
				// 数据被请求到 加入模型层
				M.add("portfolio", data);
				// 可以通知视图层去创建视图
				var $dom = V.create("portfolio");
				// 获取瀑布流容器
				var $waterfall = $dom.find("#waterfall");
				// 获取数据 渲染结构 上树
				var data = M.get("portfolio.filter");
				// 生成高度映射数组
				var height_arr = new Array(5).fill(20);
				// 定义四个数组 数组中存放的都属于它们分类的元素
				var all_arr = [];
				var categoryI_arr = [];
				var categoryII_arr = [];
				var video_arr = [];
				// 根据data.All数组渲染结构
				data.All.forEach(function(value) {
					// 创建容器li
					var li = document.createElement("li");
					// 生成图片
					var img = new Image();
					// 设置src
					img.src = "/images/art/" + value + ".jpg";
					// 监听图片的onload事件
					img.onload = function() {
						// 判定当前img所属于的分类 并加入到分类数组中
						// “所有”分类
						all_arr.push(li);
						// “categoryI”分类
						if (data.CategoryI.indexOf(value) != -1) {
							categoryI_arr.push(li);
						}
						// “categoryII”分类
						if (data.CategoryII.indexOf(value) != -1) {
							categoryII_arr.push(li);
						}
						// “video”分类
						if (data.Video.indexOf(value) != -1) {
							video_arr.push(li);
						}
						// 获取宽度高度
						var width = img.width;
						var height = img.height;
						// 获取高度映射数组中最小的项的下标
						var minIdx = getMinIdx(height_arr);
						// 上树 
						li.appendChild(img);
						// 设置li的定位值 
						li.style.position = "absolute";
						// left由数组的最小项下标去决定
						li.style.left = minIdx * 184 + "px";
						// top由数组的最小项决定
						li.style.top = height_arr[minIdx] + "px";
						// 上树
						$waterfall.append(li);
						// 改变数组中的最小值
						height_arr[minIdx] += this.height + 20;
						// 计算最大值 并设置给容器
						$waterfall.css({height: Math.max.apply("", height_arr)});
					}
				});
				// 获取四个标签
				var $lis = $dom.find(".filter ul li");
				var $all = $lis.eq(0);
				var $categoryI = $lis.eq(1);
				var $categoryII = $lis.eq(2);
				var $video = $lis.eq(3);
				// 设置点击事件
				$all.click(function() {
					sort(all_arr, all_arr)
				});
				$categoryI.click(function() {
					sort(all_arr, categoryI_arr)
				});
				$categoryII.click(function() {
					sort(all_arr, categoryII_arr)
				});
				$video.click(function() {
					sort(all_arr, video_arr)
				});
				function sort(all, cate) {
					// 将高度映射数组清空
					height_arr.fill(20);
					// 将不属于分类的过滤出来
					var other_arr = all.filter(function(value) {
						return  cate.indexOf(value) === -1;
					});
					// 当点击元素时 属于该分类的元素要重新排列 不属于的要隐藏 
					cate.forEach(function(value) {
						// 获取最小的项
						var minIdx = getMinIdx(height_arr);
						$(value).animate({
							left: minIdx * 184,
							top: height_arr[minIdx],
							opacity: 1
						}, 1000);
						// 改变height_arr
						height_arr[minIdx] += $(value).height() + 20;
					});
					// 不属于的要隐藏
					other_arr.forEach(function(value) {
						$(value).animate({opacity: 0}, 1000);
					});
				}
			}
		});
	});
});