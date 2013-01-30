define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	var Observer = tools.Observer;
	// 获取元素
	var $uploadSelect = $("#uploadSelect");
	var	$uploadFile = $("#uploadFile");
	var	$uploadBtn = $("#uploadBtn");
	var $uploadForm = $("#uploadForm");
	// 当点击按钮的时候 查找uploadFile的值 发送ajax 上传图片
	$uploadBtn.click(function() {
		// 查看是否选中了图片 如果选中就提交 如果没有选中就取消
		var val = $uploadFile.val();
		// 获取用户的目标文件夹
		var album_name = $uploadSelect.val();
		if (!val) {
			// 说明没有选中内容
			Observer.trigger("tip", "请选择图片");
			return;
		}
		// 使用ajax2.0进行表单序列化
		var form = new FormData($uploadForm[0]);
		// 因为form中没有目标文件夹的名称所以添加一个项
		form.append("album_name", album_name);
		// 发送ajax
		$.ajax({
			url: "/uploadImg",
			type: "post",
			data: form,
			dataType: "json",
			processData: false,
			contentType: false,
			success: function(data) {
				Observer.trigger("tip", data.data);
			}
		});
	});
	// 监听album_render_list事件
	Observer.on("album_render_list", function(album_name) {
		$uploadSelect.append("<option value=" + album_name + ">" + album_name + "</option>");
	});
});