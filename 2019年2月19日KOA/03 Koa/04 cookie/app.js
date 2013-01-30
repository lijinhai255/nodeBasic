// 引入Koa
var Koa = require("koa");

// 引入静态中间件
var serve = require("koa-static");

// 引入路由中间件
var Router = require("koa-router");

// 生成一个小的router对象
var router = new Router();

// 引入body中间件
var body = require("koa-body");

// 生成服务器
var app = new Koa();

// 匹配body
app.use(body());

// 静态目录
app.use(serve("./web"));

// 匹配接口
router.post("/login", (ctx) => {
	console.log(ctx.request.body);

	// 将username设置到cookie中
	ctx.cookies.set("username", ctx.request.body.yonghuming);
});

// 匹配检测cookie接口
router.get("/checkCookie", (ctx) => {
	console.log(ctx.cookies.get("username"));
})

// 挂载
app.use(router.routes());

// 监听端口号
app.listen(3000);