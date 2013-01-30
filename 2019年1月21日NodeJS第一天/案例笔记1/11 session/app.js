// 搭建服务器
var express = require("express");
// 生成服务器对象
var app = express();
// 静态化
app.use("/web/", express.static("./web"));
// body-parser是用于接收普通post请求的 请求头是application/x-www-form-urlencoded
var body_parser = require("body-parser");
// cookie-parser是用于将接收到的cookie字符串 转化成cookie对象 并安装在req身上
var cookie_parser = require("cookie-parser");
// 引入session
var session = require("express-session");
app.use(session({
	secret: "aoifhewoiajfpoeajfnepofjepofjeapoihfpohpofhafap",
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60
	}
}));
// 配置cookie
app.use(cookie_parser());
// 配置post请求
app.use(body_parser.urlencoded({extended: false}));
// 配置路由方式一  由app直接调用
app.post("/login", function(req, res) {
	// 用户登录了 设置cookie
req.session.username = req.body.username;
req.session.password = req.body.password;
	// 停留在当前路径
	// res.sendFile(__dirname + "/views/main.html");
	// 跳转到其它路径下
	res.redirect("/main");
});

app.get("/main", function(req, res) {
	console.log(req.cookies);
	// 渲染模板
	res.render("main.ejs", {
		name: req.session.username
	});
});
app.listen(3000);