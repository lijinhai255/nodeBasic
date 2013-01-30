define(function(require, exports, module) {
	var tools = require("modules/tools/tools");
	var format = tools.format
	var Observer = tools.Observer;
	MVC.addView("carousel", function(M) {
		console.log("创建carousel视图");
	})
	MVC.addCtrl("carousel", function(M, V) {
		console.log("添加carousel交互");
		// 因为数据是由其它模块请求的 所以无法立即执行 要等请求回来之后通知我 
		// 就将要执行的代码放在一个自定义事件中  等待被触发
		Observer.on("msg", function() {
			V.create("carousel");
		})
	});
});