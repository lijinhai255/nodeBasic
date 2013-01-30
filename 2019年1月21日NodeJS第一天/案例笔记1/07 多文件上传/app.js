// 搭建服务器 引入express
var express = require("express");
var fs = require("fs");
var app = express();
// 为了让web内的内容被看到 我们选择将web文件夹静态化
app.use("/web/", express.static("./web"));
// 使用formidable解析文件传递
var formidable = require("formidable");

// 配置post接口
app.post("/upload", function(req, res) {
	// 初始化一个formidable的实例
	var form = new formidable();
	// 设置存储路径
	form.uploadDir = "./uploads";
	// 定义一个数组 用于存储每一个图片的名字
	var arr = [];
	// 如果是多文件上传，我们需要得到所有图片的信息 但是如果只依赖parse方法 只能够得到一张图片 而且是上传时的最后一张
	// 我们要监听事件获取数据 file事件 该事件会在每解析完一张图片之后 就触发一次 并且在函数参数的形参列表中 可以得到图片的信息
	form.on("file", function(key, value) {
		arr.push(value);
	});
	// 使用formidable解析req
	form.parse(req, function(err, fields, files) {
		// 判定是否出错
		if (err) {
			// 报错 给前端一个响应
			res.send({
				error: 1,
				data: "解析失败"
			});
			return;
		}
		try {
			// 如果代码走到这里 说明没有进入err 说明没有错误
			arr.forEach(function(value, key) {
				// 获取原来的图片的名称
				var user_name = value.name;
				// 获取临时文件的路径
				var old_name = value.path;
				// 定义现在的名字
				var new_name = form.uploadDir + "/" + user_name;
				// 重命名
				fs.renameSync(old_name, new_name);
			});
		} catch(e) {
			res.send({
				error: 2,
				data: "代码执行失败"
			});
			return;
		}
		// 当循环完毕 就已经修改了全部的图片的名称
		res.send({
			error: 0,
			data: "图片全部上传成功"
		});
	});
});



// 监听端口
app.listen(3000);