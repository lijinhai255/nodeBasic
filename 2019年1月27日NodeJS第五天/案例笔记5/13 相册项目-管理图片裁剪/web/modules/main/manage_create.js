define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	var Observer = tools.Observer;
	// 获取输入框
	var $inp = $("#createInp");
	// 获取按钮
	var $btn = $("#createBtn");
	// 点击发送ajax 请求创建相册
	$btn.click(function() {
		// 获取输入框中的内容
		var val = $inp.val(); 
		// 发送ajax
		$.ajax({
			url: "/create_album",
			data: {
				album_name: val
			},
			type: "get",
			dataType: "json",
			success: function(data) {
				// 通知tip模块显示消息
				Observer.trigger("tip", data.data);
				// 当成功时， 除了要通知tip模块之外 还要通知 上传图片模块和显示相册模块
				if (!data.error) {
					// 触发相册更新列表事件 一会需要让上传图片模块和显示相册模块监听这个事件
					Observer.trigger("album_render_list", val);
				}
			}
		});
	});
});