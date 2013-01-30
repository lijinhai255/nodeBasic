// 引入socket
var socket_io = require("socket.io");
// 引入http模块
var http = require("http");

// 记录报道的用户
var arr = [];

function set(app) {
	// 转换成原生对象
	var server = http.Server(app);
	var io = socket_io(server);
	// 监听connection事件
	io.on("connection", function(socket) {
		var username = ""
		// 这里的socket就是本次建立起来的持久连接在后端的对象
		// 后端监听某一个事件
		socket.on("baodao", function(obj) {
			// 将报道的用户的信息放入数组
			arr.push(obj);
			username = obj.username;
			// 通知所有人 让他们更新自己的页面上的显示内容 也就是用户列表内容
			io.sockets.emit("updateUserNameList", arr);
		});
		// 监听离开事件
		socket.on("disconnect", function() {
		  arr.forEach(function(value, index) {	
		  	if (value.username === username) {
		  		arr.splice(index, 1); 
		  	}
		  });
		});

		// 监听用户发言事件
		socket.on("someonespeak", function(obj) {
			io.sockets.emit("newMsg", obj);
		});
	});

	return server;
}

module.exports = set;