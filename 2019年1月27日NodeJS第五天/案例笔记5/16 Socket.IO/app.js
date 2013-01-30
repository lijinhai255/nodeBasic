// 引入HTTP
var http = require("http");
// 引入socket.io
var socket_io = require("socket.io");
// 搭建原生服务器
var server = http.createServer();
// 将原生服务器放入socket_io
var io = socket_io(server);

// 监听端口号
server.listen(3000);