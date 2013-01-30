define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 获取观察者对象
	var Observer = tools.Observer;
	// 获取图片列表容器
	var $showImgs = $("#showImgs");
	// 监听getAlbumImgs事件
	Observer.on("getAlbumImgs", function(album_name) {
		// 发送ajax
		$.ajax({
			url: "/getAlbumImgs",
			data: {
				album_name: album_name
			},
			type: "get",
			dataType: "json",
			success: function(data) {
				if (!data.error) {
					Observer.trigger("tip", "图片请求成功");
					// 清空现有图片
					$showImgs.empty();
					// 循环data.data 
					data.data.forEach(function(value) {
						var str = [
						'<li class="col-lg-2">',
			  		'	<div><img src="' + value.src + '" alt=""></div>',
			  		'	<span>' + value.img_name + '</span>',
			  		'	<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
			  		'</li>'
						].join("");

						$showImgs.append(str);
					});

					return;
				}
			}
		});
	});
});