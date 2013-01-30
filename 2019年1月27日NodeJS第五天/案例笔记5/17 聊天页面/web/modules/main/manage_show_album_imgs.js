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
						' <input type="checkbox"data-album-name =' + album_name + ' data-img-name=' + value.img_name + ' ' + (value.display === "true" ? "checked" : "") + ' />',
			  		'	<div><img src="' + value.src + '" alt=""></div>',
			  		'	<span><a  data-album-name =' + album_name + ' data-img-name=' + value.img_name + ' data-toggle="modal" data-target="#renameModal">' + value.img_name + '</a></span>',
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

	// 委托模式添加修改图片状态事件
	$showImgs.on("click", "input", function() {
		// 获取图片名称
		var img_name = $(this).data("img-name");
		// 获取相册名称
		var album_name = $(this).data("album-name");
		// 获取input的checked属性
		var state = this.checked;
		// 发送ajax 去数据库中修改imgs集合的某一条数据的display状态
		$.ajax({
			url: "/changeImgState",
			data: {
				img_name: img_name,
				album_name: album_name,
				state: state
			},
			type: "get",
			dataType: "json",
			success: function(data) {
				console.log(data);
			}
		});
	});
});