// 引入Koa
var Koa = require("koa");
// 引入路由中间件
var Router = require("koa-router");

// 初始化一个小router
var router = new Router();

// 挂载一个路由
router.get("/check", (ctx) => {
	console.log(ctx.query);
	console.log(ctx.response);

	ctx.response.message = "nihao"; 
	ctx.response.status = 200;
});

// 搭建服务器
var app = new Koa();

// 将router再整体挂载到app上
app.use(router.routes());

// 监听端口号
app.listen(3000);