// 引入Express
var express = require("express");
// 创建服务器
var app = express();

// 想要接收到GET请求数据 那么必须先匹配到该接口
app.get("/checkName", function(req, res) {
	console.log(req.query);
});

// 监听端口号
app.listen(3000);


