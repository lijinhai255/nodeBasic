console.log("入口模块开始执行", 4);
define(function(require, exports, module) {
	// 在入口模块中引入当前页面所需要的所有模块
	require("css/reset.css");
	require("modules/bg/bg");
	require("modules/bg/bg.css");
});