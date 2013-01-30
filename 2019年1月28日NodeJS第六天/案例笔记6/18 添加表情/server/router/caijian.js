// 引入裁剪模块
var gm = require("gm");
// 引入常量模块
var CONST = require("../CONST");
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");
function caijian(req, res) {
	// 获取前端传递的数据
	var x = req.query.x;
	var y = req.query.y;
	var w = req.query.w;
	var h = req.query.h;
	// 使用gm调用裁剪方法裁切头像
	gm("." + req.session.head_pic).crop(w, h, x, y).write("." + req.session.head_pic, function(err) {
		console.log(err);
		if (err) {
			res.send(RESPONSETEXT["failed"]);
			return;
		}
		res.send(RESPONSETEXT["cutSuccess"]);
	});
}

module.exports = caijian;