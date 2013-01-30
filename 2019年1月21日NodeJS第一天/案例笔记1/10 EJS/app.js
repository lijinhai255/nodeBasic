// 搭建服务器
var express = require("express");
var app = express();
app.use("/web/", express.static("./web"));
// body-parser是用于接收普通post请求的 请求头是application/x-www-form-urlencoded
var body_parser = require("body-parser");
// cookie-parser是用于将接收到的cookie字符串 转化成cookie对象 并安装在req身上
var cookie_parser = require("cookie-parser");
// 引入fs
var fs = require("fs");
// 配置cookie
app.use(cookie_parser());
// 配置post请求
app.use(body_parser.urlencoded({extended: false}));
// 配置路由方式一  由app直接调用
app.post("/login", function(req, res) {
	// 用户登录了 设置cookie
	res.cookie("username", req.body.username);
	res.cookie("password", req.body.password);

	// 停留在当前路径
	// res.sendFile(__dirname + "/views/main.html");

	// 跳转到其它路径下
	res.redirect("/main");
});

app.get("/main", function(req, res) {
	// 读取views/main.html
	// fs.readFile("./views/main.html", function(err, data) {
	// 	var result = data.toString().replace(/<%=((\w+)(\.\w+)*)%>/g, function(match, $1) {
	// 		return req.cookies[$1];
	// 	});
	// 	// 返回格式化好之后的数据
	// 	res.send(result);
	// });

	// 渲染模板
	res.render("main.ejs", {
		name: req.cookies.username
	});
});
app.listen(3000);