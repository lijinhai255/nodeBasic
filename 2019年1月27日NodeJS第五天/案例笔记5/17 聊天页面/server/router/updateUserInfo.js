// 引入DataBase
var DataBase = require("../../db");
// 引入常量模块
var CONST = require("../CONST");
// 使用常量中的连接字符串
var connect = CONST("CONNECTSTR");
// 使用常量中的数据库名称
var dbName = CONST("DATABASENAME");
// 使用常量中的集合名称
var coll = CONST("COLLECTIONS").yonghu;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");


// 修改用户的个人信息
function updateUserInfo(req, res) {
	// 获取用户传递的数据
	var type = req.query.type;
	var value = req.query.value;
	// 连接数据库
	var db = new DataBase(connect, dbName, coll);
	// 定义查询条件
	var query = {
		username: req.session.username
	};
	// 定义修改的内容
	var update = {
	}
	update[type] = value;
	// 修改
	db.updateOne(query, {$set: update}, function(err, result) {
		if (err) {
			res.send(RESPONSETEXT["failed"]);
			return;
		}
		res.send(RESPONSETEXT["success"]);
	});
}
module.exports = updateUserInfo;