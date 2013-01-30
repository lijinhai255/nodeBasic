define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 引入观察者对象
	var Observer = tools.Observer;
	// 获取模态框本身
	var $renameModal = $("#renameModal");
	// 获取模态框中的表单
	var $renameModalForm = $("#renameModalForm");
	// 获取模态框中的表单中的按钮
	var $renameModalFormBtn = $("#renameModalFormBtn");

	// 监听模态框的出现事件
	$renameModal.on("show.bs.modal", function(e) {
		console.log(e.relatedTarget);
		// 获取相册名称
		var album_name = $(e.relatedTarget).data("album-name");
		// 获取图片名称
		var img_name = $(e.relatedTarget).data("img-name");
		console.log(album_name, img_name);
		// 获取表单中的两个input[type=hidden]
		var $album_name_inp = $renameModalForm.find("input[name=album_name]");
		var $img_name_inp = $renameModalForm.find("input[name=img_name]");
		// 设置值
		$album_name_inp.val(album_name);
		$img_name_inp.val(img_name);
	});


	// 添加点击事件
	$renameModalFormBtn.click(function() {
		// 序列化表单
		var data = $renameModalForm.serialize();
		console.log(data);
		// 获取当前相册的名称
		var album_name = $renameModalForm.find("input[name=album_name]").val();
		// 发送ajax
		$.ajax({
			url: "/renameImg",
			data: data,
			type: "get",
			dataType: "json",
			success: function(data) {
				Observer.trigger("tip", data.data);
				setTimeout(function() {
					Observer.trigger("tipCancel");
					Observer.trigger("getAlbumImgs", album_name);
				}, 500);
			}
		});
	});
});