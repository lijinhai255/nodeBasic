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

function checkName(req, res) {
	// console.log("接收到请求了");
	// 接收数据
	var username = req.query.username;
	// 拿着去数据库中检测
	// 确定数据库名称 确定连接字符串 确定集合名称
	var db = new DataBase(connect, dbName, coll);
	// 调用db.findOne方法 
	db.findOne({username: username}, function(err, obj) {
		if (err) {
			// 查询失败
			res.send(RESPONSETEXT["findUserNameFailed"]);
			return;
		}
		if (obj) {
			res.send(RESPONSETEXT["userExist"]);
			return;
		}
		res.send(RESPONSETEXT["userUseable"])
	})
}


module.exports = checkName;