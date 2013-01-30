// 引入express
var express = require("express");
// 因为socket.io的原因 我们需要将express搭建出来的app 转为原生的对象
var http = require("http");
// 引入socket.io
var socket_io = require("socket.io");
// 搭建express服务器
var app = express();
// 转换对象
var server = http.Server(app);
// 将express服务器放入socket_io
var io = socket_io(server);
// 监听端口号
server.listen(3000);
// server是带有socket.io功能的原生服务器
// app是纯粹的express服务器 
// app.listen(3001);