// 引入DataBase
var DataBase = require("../../db");
// 引入常量模块
var CONST = require("../CONST");
// 使用常量中的连接字符串
var connect = CONST("CONNECTSTR");
// 使用常量中的数据库名称
var dbName = CONST("DATABASENAME");
// 使用常量中的集合名称
var coll = CONST("COLLECTIONS").xiangce;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");

// 用户点击目标的名称时，查找该目标名下的所有相册
function one_people_albums(req, res) {
	// 获取目标
	var target = req.query.target;
	// 定义数据库对象
	var db = new DataBase(connect, dbName, coll);
	// 根据目标查询该目标名下的所有相册
	db.findMany({username: target}, function(err, arr) {
		if (err) {
			// 如果出现错误，因为这是一个a标签发出的请求 需要返回一个页面 所以渲染错误模板
			res.render("error.ejs", {
				msg: RESPONSETEXT["failed"].data
			});
			return;
		}
		res.render("one_people_albums.ejs", {
			target: target,
			albumArr: arr,
			username: req.session.username,
			head_pic: req.session.head_pic,
			navArr: req.session.navArr
		});
	});
}

module.exports = one_people_albums;