define(function(require, exports, module) {
	var tools = require("modules/tools/tools");
	var Observer = tools.Observer;
	// 获取元素
	var $newPasswordInp = $("#newPasswordInp");
	var $newPasswordBtn = $("#newPasswordBtn");
	var $newHeadPicInp = $("#newHeadPicInp");
	var $newHeadPicBtn = $("#newHeadPicBtn");
	var $newNickNameInp = $("#newNickNameInp");
	var $newNickNameBtn = $("#newNickNameBtn");


	// 当点击密码修改按钮时
	$newPasswordBtn.click(function() {
		// 获取用户输入的密码 并验证
		var val = $newPasswordInp.val();
		// 发送到服务器修改密码的接口上 修改
		$.ajax({
			url: "/updateUserInfo",
			data: {
				type: "password",
				value: val
			},
			type: "get",
			dataType: "json",
			success: function(data) {
				console.log(data);
			}
		});
	});
	// 当点击昵称修改按钮时
	$newNickNameBtn.click(function() {
		// 获取用户输入的昵称 并验证
		var val = $newNickNameInp.val();
		// 发送到服务器修改用户信息的接口上
		$.ajax({
			url: "/updateUserInfo",
			data: {
				type: "nickname",
				value: val
			},
			type: "get",
			dataType: "json",
			success: function(data) {
				console.log(data);
			}
		});
	});

	// 当点击修改头像按钮时
	$newHeadPicBtn.click(function() {
		// 使用ajax发送图片 上传到服务器上 修改用户的当前头像
		var val = $newHeadPicInp[0].files[0];
		// 初始化一个对象
		var fd = new FormData();
		// 设置一个字段进去
		fd.set("file", val);
		$.ajax({
			url: "/updateHeadPic",
			data: fd,
			type: "post",
			dataType: "json",
			contentType: false,
			processData: false,
			success: function(data) {
				if (!data.error) {
					Observer.trigger("tip", data.data);
					// 发送ajax 请求头像图片的新的路径
					Observer.trigger("changeHeadPic", data.head_pic);
				}
			}
		})
	});

});