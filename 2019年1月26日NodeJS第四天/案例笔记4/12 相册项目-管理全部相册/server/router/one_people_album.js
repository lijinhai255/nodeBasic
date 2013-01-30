// 引入DataBase
var DataBase = require("../../db");
// 引入常量模块
var CONST = require("../CONST");
// 使用常量中的连接字符串
var connect = CONST("CONNECTSTR");
// 使用常量中的数据库名称
var dbName = CONST("DATABASENAME");
// 使用常量中的集合名称
var coll = CONST("COLLECTIONS").tupian;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");

// 用户点击目标的名称时，查找该目标名下的某个相册下的所有可见图片
function one_people_album(req, res) {
	// 获取目标
	var target = req.query.target;
	// 获取目标相册
	var album_name = req.query.album_name;
	// 定义数据库对象
	var db = new DataBase(connect, dbName, coll);
	// 根据目标查询该目标名下的某个相册下的所有可见图片
	// 定义查询条件
	var query = {
		username: target,
		album_name: album_name,
		display: "true"
	};
	console.log(query);
	db.findMany(query, function(err, arr) {
		if (err) {
			// 如果出现错误，因为这是一个a标签发出的请求 需要返回一个页面 所以渲染错误模板
			res.render("error.ejs", {
				msg: RESPONSETEXT["failed"].data
			});
			return;
		}
		console.log(arr);
		var imgArr = arr.map(function(value) {
			return "/albums/" + value.username + "/" + value.album_name + "/" + value.img_name;
		});
		console.log(arr);
		res.render("one_people_album.ejs", {
			target: target,
			album_name: album_name,
			arr: arr,
			imgArr: imgArr
		});
	});
}

module.exports = one_people_album;