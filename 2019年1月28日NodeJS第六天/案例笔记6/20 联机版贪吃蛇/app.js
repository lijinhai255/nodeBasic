// 引入express
var express = require("express");
// 搭建app
var app = express();

// 配置
var conf = require("./server/conf");
conf(app);

// 路由
var router = require("./server/router");
router(app);


// socket部分
var socket = require("./server/socket");
var server = socket(app);

// 监听端口
server.listen(3000);