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
	// 定义信号量 负责用户名验证的开关 与密码验证的开关
	var username_lock = false;
	var password_lock = false;
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
			// 验证不通过 
			username_lock = false;
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
				Observer.trigger("tip", data.data);
				// 如果成功  
				if (!data.error) {
					username_lock = true;
				} else {
					username_lock = false;
				}
			}
		})
	});

	// 获取密码和重复密码
	var $registFormPasswordInp = $("#registFormPasswordInp");
	var $registFormPasswordInpRepeat = $("#registFormPasswordInpRepeat");
	// 监听它俩的blur事件
	$registFormPasswordInp.blur(function() {
		// 获取两个密码
		var pass1 = $(this).val();
		var pass2 = $registFormPasswordInpRepeat.val();
		// 比较是否全等
		if (pass1 === pass2) {
			// 开锁
			password_lock = true;
		} else {
			password_lock = false;
		}
	})
	$registFormPasswordInpRepeat.blur(function() {
		// 获取两个密码
		var pass1 = $(this).val();
		var pass2 = $registFormPasswordInp.val();
		// 比较是否全等
		if (pass1 === pass2) {
			// 开锁
			password_lock = true;
		} else {
			password_lock = false;
			Observer.trigger("tip", "密码不一致，请检查");
		}
	});

	// 监听注册点击事件
	$registFormBtn.click(function() {
		// 检测两个信号量是否都为true 
		if (!(username_lock && password_lock)) {
			// 只要进来了就说明有一个是不正确的 提示用户重新填写
			Observer.trigger("tip", "信息输入错误，请重新检查!");
			return;
		}
		// 成功
		// 表单序列化
		var data = $registForm.serialize();
		// 发送ajax
		$.ajax({
			url: "/regist",
			type: "post",
			data: data,
			dataType: "json",
			success: function(data) {
				Observer.trigger("tip", data.data);
				// 判定是否成功
				if (!data.error) {
					// 去登录 
					$goLogin.trigger("click");
					return;
				}
			}
		})
	})
});