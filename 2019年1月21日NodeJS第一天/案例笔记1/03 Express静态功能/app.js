// 既然要使用express创建服务器 那么就引入进来
var express = require("express");
// 创建服务器
var app = express();
// Express唯一内置的中间件 static 该中间件用于静态化目录
app.use( express.static("web"));
// 监听端口号
app.listen(3000);