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

// 定义用户注册处理函数
function login(req, res) {
 	// 获取前端提交的数据
 	var username = req.body.username;
 	var password = req.body.password;
 	// 验证
 	var db = new DataBase(connect, dbName, coll);
 	// 定义查询对象
 	var query = {
 		username: username,
 		password: password
 	}
 	db.findOne(query, function(err, obj) {
 		console.log(obj);
 		if (err) {
 			res.send(RESPONSETEXT["findDataErr"]);
 			return;
 		}
 		// 如果obj是对象 说明登录成功
 		if (obj) {
 			// 设置session
 			req.session.username = obj.username;
 			req.session.head_pic = obj.head_pic;
 			req.session.navArr = [];
 			res.send(RESPONSETEXT["success"]);
 			return;
 		} 
 		// 如果obj是null 说明用户名或密码错误
 		res.send(RESPONSETEXT["usernameOrpasswordErr"]);
 	})
}

// 暴露
module.exports = login;