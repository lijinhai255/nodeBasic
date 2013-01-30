// 搭建一个http服务器 
var http = require("http");
// 使用url模块
var url = require("url");
// 使用fs模块
var fs = require("fs");
// 创建服务
var server = http.createServer(function(req,res){
	// 静态服务器 只需要处理前端对页面和文件的请求，而不需要处理其它请求
	// 只需要关心pathname部分
	var base_url = url.parse(req.url,true);
	var pathname = base_url.pathname.slice(1);
	// console.log();
	// pathname = decodeURIComponent(pathname);
	fs.readFile(pathname,function(err,data){
		if(err){
			// console.log(err);
			res.end("404"+pathname+"页面/文件不存在");
			return;
		}
		res.end(data);
	})
	// res.end("");
});
// 监听端口号
server.listen(3001);