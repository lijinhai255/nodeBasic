// 引入Koa
var Koa = require("koa");
// 引入路由中间件
var Router = require("koa-router");
// 定义静态中间件
var serve = require("koa-static");

// 定义解析post请求中间件
var body = require("koa-body");
// 初始化一个小router
var router = new Router();


// 搭建服务器
var app = new Koa();

// 配置
app.use(serve("./web"));
// 配置
app.use(body());
// 配置接口
router.post("/login", (ctx) => {
	console.log(ctx.request.body);
})

// 将router再整体挂载到app上
app.use(router.routes());

// 监听端口号
app.listen(3000);