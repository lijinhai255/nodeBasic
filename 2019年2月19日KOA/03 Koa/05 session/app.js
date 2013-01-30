// 引入Koa
var Koa = require("koa");

// 引入静态中间件
var serve = require("koa-static");

// 引入路由中间件
var Router = require("koa-router");

// 生成一个小的router对象
var router = new Router();

// 引入session
var session = require("koa-session");



// 引入body中间件
var body = require("koa-body");

// 生成服务器
var app = new Koa();

// 为了设置session 必须给app添加一个keys属性 值是一个数组 数组中有一项 是secret
app.keys = ["asokdhoiewahoiaewhoihewaoihewaoihoiewhfehfoiewahfoewa"];

// 应用
app.use(session({}, app));

// 匹配body
app.use(body());

// 静态目录
app.use(serve("./web"));

// 匹配接口
router.post("/login", (ctx) => {
	console.log(ctx.session);
	// 将用户名放入
	ctx.session.username = ctx.request.body.yonghuming;
});




// 挂载
app.use(router.routes());

// 监听端口号
app.listen(3000);