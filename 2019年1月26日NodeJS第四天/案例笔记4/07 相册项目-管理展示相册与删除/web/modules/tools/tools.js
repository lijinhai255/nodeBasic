define(function(require, exports, module) {
	// 向外提供一系列的工具函数
	// 格式化函数
	function format(tpl, dic) {
		// 返回一个被格式化之后的字符串
		return tpl.replace(/<%(\w+(\.\w+)*)%>/g, function(match, $1) {
			// 将$1以.分割
			var pathArr = $1.split(".");
			// 定义变量 引用dic 防止dic的地址发生变化
			var result = dic;
			// 开始循环每一层级 除了最后一层之外
			for (var i = 0; i < pathArr.length - 1; i++) {
				result = result[pathArr[i]];
			}
			return result[pathArr[i]];
		})
	}
	// 提供观察者
	var Observer = (function() {
		var obj = {

		}

		return {
			on: function(eventName, handler) {
				if (obj[eventName] instanceof Array) {
					// 说明已经用过了 直接往里面push
					obj[eventName].push(handler);
				} else {
					obj[eventName] = [handler];
				}
			},
			trigger: function(eventName, value) {
				if (obj[eventName]) {
					for (var i = 0; i < obj[eventName].length; i++) {
						obj[eventName][i](value);
					}
				}
			},
		}
	})();

	// 提供获取最小项下标的方法
	var getMinIdx = function(arr) {
		// 默认第一项最小
		var idx = 0;
		var min = arr[idx];
		// 循环
		for (var i = 1; i < arr.length; i++) {
			if (min > arr[i]) {
				min = arr[i];
				idx = i;
			}
		}
		return idx;
	}
	// 提供策略
	// 定义策略对象
	var strategy = (function() {
		// 存储策略的对象
		var obj = {
			"allCN": function(string) {
				// 定义正则 判定是否string符合正则的验证
				var reg = /^[\u4e00-\u9fa5]{2,16}$/;
				// 开始验证
				if (reg.test(string)) {
					return "";
				}
				return "请输入2~16位的纯中文";
			},
			"allEN": function() {

			},
			"allNum": function() {

			}
		}

		// 返回一个接口 向外暴露方法 
		return {
			use: function(type, string) {
				return obj[type](string);
			},
			add: function(type, handler) {
				if (obj[type]) {
					throw new Error("该策略已经存在");
				}
				obj[type] = handler;
			}
		}
	})();
	module.exports.format = format;
	module.exports.Observer = Observer;
	module.exports.getMinIdx = getMinIdx;
	module.exports.strategy = strategy;
});