define(function(require, exports, module) {
	// 获取元素
	var $goRegist = $("#goRegist");
	var $loginForm = $("#loginForm");
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
});