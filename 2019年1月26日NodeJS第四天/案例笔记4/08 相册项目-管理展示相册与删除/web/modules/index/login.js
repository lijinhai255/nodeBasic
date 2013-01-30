define(function(require, exports, module) {
	// 获取元素
	var $goRegist = $("#goRegist");
	var $loginForm = $("#loginForm");
	var $loginFormBtn = $("#loginFormBtn");
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 引入观察者对象
	var Observer = tools.Observer;
	// 注册一个自定义事件 叫做显示登录表单
	Observer.on("showLoginForm", function() {
		// 显示登录表单
		$loginForm.removeClass("hide");
	});
	// 点击goRegist按钮时 
	$goRegist.click(function() {
		// 隐藏登录表单 
		$loginForm.addClass("hide");
		// 触发登录模块的显示事件
		Observer.trigger("showRegistForm");
	});

	// 绑定按钮点击事件
	$loginFormBtn.click(function() {
		// 表单序列化
		var data = $loginForm.serialize();
		// 发送ajax
		$.ajax({
			url: "/login",
			data: data,
			type: "post",
			dataType: "json",
			success: function(data) {
				Observer.trigger("tip", data.data);
				// 如果成功 跳转页面
				if (!data.error) {
					setTimeout(function() {
						location.href = "/main";
					}, 500);
					return;
				}
			}
		});
	});
});