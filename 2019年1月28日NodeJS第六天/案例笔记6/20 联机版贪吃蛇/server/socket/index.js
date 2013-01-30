// 引入socket
var socket_io = require("socket.io");
// 引入http模块
var http = require("http");



var i = 0;
// 定义一个函数 该函数用于生成一个唯一的字符串id
var createID = function() {
	return i++ + "j";
}

function set(app) {
	// 转换成原生对象
	var server = http.Server(app);
	var io = socket_io(server);
	
	// 定义房间数组
	var roomArr = [];
 	
 	io.on("connection", function(socket) {
 		// 监听报道事件
 		socket.on("baodao", function(obj) {
 			// 给socket添加一个username属性
 			socket.username = obj.username;

 			// 通知该用户 当前有哪些房间
 			socket.emit("renderRoom", roomArr);
 		});
 		// 监听创建房间事件
 		socket.on("createRoom", function() {
 			// 要知道是谁创建的房间 和 该连接的id
 			// console.log("要创建房间的人的名称是" + socket.username + "要创建房间链接的id是" + socket.id);
 			// 先检测当前用户是否已经存在房间
 			for (var i = 0; i < roomArr.length; i++) {
 				if (roomArr[i].roomOwner === socket.username) {
 					console.warn("警告:你已经拥有房间了");
 					return;
 				}
 			}
 			// 真的创建房间
 			var roomObj = {
 				roomOwner: socket.username,
 				roomID: createID(),
 				playersArr: [
 					{
 						username: socket.username,
 						id: socket.id
 					}
 				]
 			}
 			// 创建分组
 			socket.join(roomObj.roomID);
 			// 放入房间数组
 			roomArr.push(roomObj);
 			// 通知前端 更新页面上的内容
 			io.sockets.emit("renderRoom", roomArr);
 		});


 		// 监听加入分组事件
 		socket.on("joinGroup", function(groupID) {
 			// 循环检测
 			for (var i = 0; i < roomArr.length; i++) {
 				// 判定是否是自己的房间
 				if (roomArr[i].roomID === groupID && roomArr[i].roomOwner === socket.username) {
 					// 说明是自己的房间
 					console.log("不能再次加入自己的房间");
 					return;
 				}
 				// 判定是否是其它房间的房主
 				if (roomArr[i].roomID != groupID && roomArr[i].roomOwner === socket.username) {
 					// 说明是其它房间的房主
 					console.log("其它房间的房主加入到了" + groupID + "房间");
 					roomArr.splice(i, 1);
 					break;
 				}
 			}
 			// 加入该房间
 			socket.join(groupID);
 			// 开始游戏
 			io.to(groupID).emit("gameStart", groupID);
 		});

 		// 监听用户更改方向的消息
 		socket.on("changeForward", function(obj) {
 			console.log("用户" + socket.username + "更改了方向" + obj.code);
 			// 此时通知另外一个人更改他的第二条蛇
 			socket.broadcast.to(obj.groupID).emit("secondChange", obj.code);
 		})
 	});

	return server;
}

module.exports = set;