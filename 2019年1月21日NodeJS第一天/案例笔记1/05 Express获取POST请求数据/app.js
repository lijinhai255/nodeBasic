// 引入Express
var express = require("express");
// 引入body-parser
var body_parser = require("body-parser"); 
// 创建服务器
var app = express();
// 静态文件夹
app.use("/web/", express.static("web"));
app.use(body_parser.urlencoded({extended: false}));

// app.post用于处理POST请求
app.post("/login", function(req, res) {
	console.log(req.body);
});

// 监听端口号
app.listen(3000);