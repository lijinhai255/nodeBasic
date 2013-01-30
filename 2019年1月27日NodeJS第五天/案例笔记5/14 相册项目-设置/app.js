// 引入express
var express = require("express");
// 生成app
var app = express();

// 引入配置
var conf = require("./server/conf");
// 配置
conf(app);

// 引入接口配置函数
var router = require("./server/router");
// 加载router
router(app);

// 监听端口
app.listen(3000);