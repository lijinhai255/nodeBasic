define(function(require, exports, module) {
		// 获取元素 
		var $tipModal = $("#tipModal");
		var $tipModalContent = $("#tipModalContent");
		// 引入工具模块
		var tools = require("modules/tools/tools");
		// 引入观察者对象
		var Observer = tools.Observer;
		// 注册一个事件 该事件可以被别的模块触发 当触发时 传递要显示的消息 由本模块显示
		Observer.on("tip", function(data) {
			$tipModal.modal();
			$tipModalContent.html(data);
		});
});