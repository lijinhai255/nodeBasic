// 引入各种插件
var body_parser  = require("body-parser");
var session = require("express-session");
var cookie_parser = require("cookie-parser");
var express = require("express");
// 所有的配置都放在这里
function conf(app) {
	// 配置各种插件
	app.use(body_parser.urlencoded({extended: false}));
	app.use(cookie_parser());
	app.use(session({
		secret: "sadf            hfoieahwoifhewaoifh",
		resave: false,
		saveUninitialized: false
	}));
	app.use("/web/", express.static("./web"));
}

// 暴露函数出去
module.exports = conf;