define(function(require, exports, module) {
	var tools = require("modules/tools/tools");
	var Observer = tools.Observer;
	// 获取元素
	var $nav = $("#nav");
	var $img = $nav.find("img");
	// 获取用户名称
	var username = $nav.find(".username").html();

	//注册图片更改事件
	Observer.on("changeHeadPic", function(newPath) {
	 	$img.attr("src", newPath);
	});

	// 自己是可以得到内容的 
	Observer.on("getMsg", function() {
		Observer.trigger("sendMsg", {
			username: username,
			head_pic: $img.attr("src")
		})
	})
});