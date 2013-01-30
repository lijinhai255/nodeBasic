// 引入裁剪模块
var gm = require("gm");
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
			res.send({error: 1, data: "裁切头像失败"});
			return;
		}
		res.send({error: 0, data: "裁切头像成功"});
	});
}

module.exports = caijian;