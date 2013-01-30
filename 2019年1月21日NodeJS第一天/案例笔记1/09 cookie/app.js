// 搭建服务器
var express = require("express");
var app = express();
app.use("/web/", express.static("./web"));
// body-parser是用于接收普通post请求的 请求头是application/x-www-form-urlencoded
var body_parser = require("body-parser");
// cookie-parser是用于将接收到的cookie字符串 转化成cookie对象 并安装在req身上
var cookie_parser = require("cookie-parser");
// 配置cookie
app.use(cookie_parser());
// 配置post请求
app.use(body_parser.urlencoded({extended: false}));
// 配置路由方式一  由app直接调用
app.post("/login", function(req, res) {
    console.log(req.body);
    // 当用户登录时 将用户的账户名和密码设置到cookie中
    // 设置cookie 不需要使用任何插件 express自带了
    res.cookie("username", req.body.username);
    res.cookie("password", req.body.password);
    // 当用户登录时，默认登录成功
    res.send("登录成功");
});
app.get("/checkCookie", function(req, res) {
    console.log(req.cookies);
});
app.listen(3000);