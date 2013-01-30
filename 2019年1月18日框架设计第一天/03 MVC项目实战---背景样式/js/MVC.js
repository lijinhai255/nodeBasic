// 根据MVC的思想 实现一个MVC框架 
// 既然是一个JS文件 而且内部要实现一个东西
// 那么为了避免干扰 我们将要实现的内容，放在一个IIFE中
var MVC = (function() {
	// 定义M层
	var M = (function() {
		// 真正的存储数据的M放在内部
		var _M = {
		};
		return {
			/*
			 * add方法 用于向_M中存储数据 
			 * @path 存储的路径 ex: header.nav
			 * @value 被存储的值  ex: ["", "", ""]
			 */
			add: function(path, value) {
				// 将value按照path的层级存储到_M中
				// 既然按照path层级 就先将path以.分隔出层级
				var pathArr = path.split(".");
				// 定义_M的引用
				var result = _M;
				// 循环pathArr 
				for (var i = 0; i < pathArr.length - 1; i++) {
					var temp = result[pathArr[i]];
					// 判断当前层级是否是一个对象 
					if (typeof temp === "object" && temp != null || typeof temp === "function") {
						// 说明要么是真正的对象类型 要么是函数类型 这两个类型都可以继续添加属性 
					} else if (typeof temp === "undefined") {
						// 说明没有人使用过 
						result[pathArr[i]] = {};
					} else {
						// 说明既不是引用类型又不是undefined 只能是其它类型 说明被人用过
						throw new Error("不可以占用别人的内容");
					}
					// 指向下一层
					result = result[pathArr[i]];
				}
				// 循环完毕 此时result是倒数第二层 我们最终要设置的是倒数第一层 就是result的一个属性
				// 判定 最后一层是否被人用过
				if (typeof result[pathArr[i]] === "undefined") {
					// 说明没被人使用过 
					result[pathArr[i]] = value;
				} else {
					// 说明被人用过
					throw new Error("抱歉，已经被人占用");
				}
			},
			/*
       * get方法 用于从_M中提取数据
       * @path 提取的路径 ex: header.nav
       * 返回值：["", "", ""] 
			 */
			get: function(path) {
				// 分割数组
				var pathArr = path.split(".");
				// 备份_M
				var result = _M;
				// 开始循环
				for (var i = 0; i < pathArr.length - 1; i++) {
					// 定义一个临时变量
					var temp = result[pathArr[i]];
					if (typeof temp === "object" && temp != null || typeof temp === "function") {
						// 指向下一层
						result = result[pathArr[i]];
					} else {
						return null;
					}
				}
				return result[pathArr[i]];
			}
		}
	})();
	// 定义V层
	// V层负责创建DOM结构 而创建DOM结构的都是代码 如何存储代码呢？
	// 可以将代码放入一个函数 再把函数存储起来 
	// 所以V层必然要有一个接口 用于存储函数
	// 既然要存储函数 将来必定要执行 执行的时候得有接口去调用
	// 所以V层必然要有第二个接口 用于执行函数
	var V = (function() {
		// 定义对象用于存储函数
		var _V = {};

		// 返回一个对象 对象中有两个接口 一个用于存储函数 一个用于执行函数
		return {
			/*
       * add 方法用于存储函数  这些函数都是用于创建DOM结构的 
       * @name 函数的名称
       * @handler 函数本身
			 */
			add: function(name, handler) {
				_V[name] = handler;
			},
			/* 
       * create 方法用于执行函数 
       * @name 函数的名称
			 */
			create: function(name) {
				_V[name] && _V[name](M);
			}
		}
	})();
	// 定义C层
	var C = (function() {
		// 定义一个存储函数的对象
		var _C = {};
		// 返回一个对象 对象中有两个接口 
		return {
			add: function(name, handler) {
				_C[name] = handler;
			},
			
			init: function() {
				for (var i in _C) {
					_C[i](M, V);
				}
			}
		}
	})();
	return {
		addModel: function(path, value) {
			M.add(path, value);
		},
		addView: function(name, handler) {
			V.add(name, handler);
		},
		addCtrl: function(name, handler) {
			C.add(name, handler);
		},
		install: function() {
			C.init();
		}
	}
})(); 