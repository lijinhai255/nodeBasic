define(function(require, exports, module) {
	var tools = require("modules/tools/tools");
	var Observer = tools.Observer;
	// 获取元素
	var $nav = $("#nav");
	var $img = $nav.find("img");

	//注册图片更改事件
	Observer.on("changeHeadPic", function(newPath) {
	 	$img.attr("src", newPath);
	});
});