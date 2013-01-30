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
	// 使用formidable解析req
	form.parse(req, function(err, fields, files) {
		console.log(err);
		console.log(fields);
		console.log(files);
		// 判定是否出错
		if (err) {
			// 报错 给前端一个响应
			res.send({
				error: 1,
				data: "解析失败"
			});
			return;
		}
		// 如果代码走到这里 说明没有进入err 说明没有错误
		// 我们要将图片的名字改为用户传递的名字
		var user_name = fields.filename;
		// 定义原来的名称
		var old_name = files.file.path;
		// 获取拓展名
		var ext_name = files.file.name.split(".").pop();
		// 定义现在的名字
		var new_name = form.uploadDir + "/" + user_name + "." + ext_name;
		// 重命名
		fs.rename(old_name, new_name, function(err) {
			if (err) {
				res.send({
					error: 2,
					data: "重命名失败"
				});
				return;
			}
			res.send({
				error: 0,
				data: "上传成功"
			})
		})
	});

});



// 监听端口
app.listen(3000);