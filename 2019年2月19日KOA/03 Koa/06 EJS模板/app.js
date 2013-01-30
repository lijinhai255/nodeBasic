// 引入模块
var Koa = require("koa");

// koa-body
var body = require("koa-body");

// 搭建服务器
var app = new Koa();

// 引入ejs
var ejs = require("koa-ejs");

// 路由
var router = new require("koa-router")();

// 静态中间件
var serve = require("koa-static");

ejs(app, {
	root: "./views",
	layout: false,
	extName: ".html"
})

app.use(body());

app.use(serve("./web"));

router.post("/login", async (ctx) => {
	// 获取用户名
	var username = ctx.request.body.yonghuming;
	// 渲染模板
	await ctx.render("main", {
		username
	})
})



app.use(router.routes());


app.listen(3000);