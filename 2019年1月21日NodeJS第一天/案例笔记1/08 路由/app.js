// 搭建服务器
var express = require("express");
var app = express();
app.use("/web/", express.static("./web"));

// 配置路由方式一  由app直接调用
// app.post("/login", function(req, res) {
// 	res.send("登录成功");
// });

// 引入外部的router对象
var router = require("./router");
// 挂载到app上
app.use(router);
app.listen(3000);