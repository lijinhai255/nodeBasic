define(function(require, exports, module) {
	// 获取元素
	var $goLogin = $("#goLogin");
	var $registForm = $("#registForm");
	var $registFormUsernameInp = $("#registFormUsernameInp");
	var $registFormBtn = $("#registFormBtn");
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 引入观察者对象
	var Observer = tools.Observer;
	// 引入策略对象
	var strategy = tools.strategy;
	// 点击goLogin按钮时 
	$goLogin.click(function() {
		// 隐藏注册表单 
		$registForm.addClass("hide");
		// 触发登录模块的事件
		Observer.trigger("showLoginForm");
	});
	// 注册事件 显示注册表单
	Observer.on("showRegistForm", function() {
		// 显示注册表单
		$registForm.removeClass("hide");
	});
	// 当用户注册时 监听用户输入的名称 发送ajax请求 去验证是否可以使用
	$registFormUsernameInp.blur(function() {
		// 获取用户输入的内容 
		var val = $(this).val();
		// 策略模式验证是否符合正则
		var result = strategy.use("allCN", val);
		if (result) {
			Observer.trigger("tip", result);
			return;
		}
		// 如果符合 就应当发送ajax请求 验证该用户名称是否已经存在
		$.ajax({
			url: "/checkName",
			type: "get",
			data: {
				username: val
			},
			dataType: "json",
			success: function(data) {
				console.log(data);
			}
		})
	});
});