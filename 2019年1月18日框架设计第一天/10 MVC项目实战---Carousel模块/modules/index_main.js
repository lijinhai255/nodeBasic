define(function(require, exports, module) {
	// 在入口模块中引入当前页面所需要的所有模块
	require("css/reset.css");
	require("modules/bg/bg");
	require("modules/bg/bg.css");
	require("modules/header/header");
	require("modules/header/header.css");
	require("modules/home/home");
	require("modules/home/carousel/carousel");
	require("modules/home/whatwedo/whatwedo");
	require("modules/home/latestworks/latestworks");
});