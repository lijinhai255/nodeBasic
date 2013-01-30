define(function(require, exports, module) {
	// 引入Observer
	var Observer = require("modules/tools/tools").Observer;
	// 获取元素
	var $userList = $("#userList");
	var $wordList = $("#wordList");
	var $chatInp = $("#chatInp");
	var $chatSend = $("#chatSend");
	// 定义两个变量 用于获取用户名和头像
	var username = "";
	var head_pic = "";
	// 监听sendMsg事件
	Observer.on("sendMsg", function(obj) {
		username = obj.username;
		head_pic = obj.head_pic;
	});
	// 初始化 websocket连接请求
	var socket = io();
	// 触发getMsg事件
	Observer.trigger("getMsg");
	// 通知后台 有人登录了 并将用户的名称 头像地址 发送过去
	socket.emit("baodao", {
		username: username,
		head_pic: head_pic
	});

	// 监听updateUserNameList事件
	socket.on("updateUserNameList", function(arr) {
		// 清空原来的列表 
		$userList.html("");
		// 挨个上树
		arr.forEach(function(value) {
			$userList.append("<li><span><img src=" + value.head_pic + " /></span><span class='ellipsis'>" + value.username + "</span></li>")
		});
	});

	// 绑定点击事件
	$chatSend.click(function() {
		// 获取内容
		var val = $chatInp.val();
		if (!val) {
			return;
		}
		// 清空已经输入的内容
		$chatInp.val("");
		// 发给服务器
		socket.emit("someonespeak", {
			username: username,
			content: val
		});
	});

	// 监听新消息事件
	socket.on("newMsg", function(obj) {
		// 获取用户输入的内容
		var content = obj.content;
		// 获取用户名称
		var username = obj.username;
		$wordList.append("<li><span>" + username + "</span><span>说：</span><span>" + content + "</span></li>")
	});
});