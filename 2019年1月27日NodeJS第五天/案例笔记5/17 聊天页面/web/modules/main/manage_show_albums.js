define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 获取观察者对象
	var Observer = tools.Observer;
	// 获取元素
	var $albumList = $("#albumList");
	// 通过委托模式绑定事件
	// 第一次 点击元素获取该相册名称并发送ajax 获取该相册下的所有图片 并展示在展示图片中
	$albumList.on("click", ".album-name", function() {
		// 获取相册名称
		var album_name = $(this).parent().data("album-name");
		// 通知另外一个模块 去发送ajax 
		Observer.trigger("getAlbumImgs", album_name);
	});

	// 第二次 点击元素获取该相册名称并发送ajax 移除该相册
	$albumList.on("click", "button", function() {
		// 获取li元素
		var $li = $(this).parent();
		// 获取相册名称
		var album_name = $li.data("album-name");
		// 发送ajax
		$.ajax({
			url: "/removeAlbum",
			data: {
				album_name: album_name
			},
			type: "get",
			dataType: "json",
			success: function(data) {
				// 提示操作结果
				Observer.trigger("tip", data.data);
				// 删除自己的该元素
				$li.remove();
				// 通知上传模块 移除该相册
				Observer.trigger("removeAlbum", album_name);
			}
		});
	}); 


	// 监听创建相册事件
	Observer.on("album_render_list", function(album_name) {
		// 创建一个li 并上树
		var str = [
		'<li data-album-name='+ album_name + '>',
			'<span class="album-name">' + album_name + '</span>',
			'<button type="button" class="close" aria-label="Close">',
				'<span aria-hidden="true">×</span>',
			'</button>',
		'</li>'
		].join("");
		$albumList.append(str);
	});
});