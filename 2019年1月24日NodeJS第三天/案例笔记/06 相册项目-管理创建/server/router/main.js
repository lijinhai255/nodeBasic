// 引入各个数据
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


function main(req, res) {
	// 先去数据库中查询所有用户的信息
	var db = new DataBase(connect, dbName, coll);
	db.findMany({}, function(err, arr) {
		if (err) {
			// 重定向到错误处理路由 该路由会返回一个错误信息页面给用户 能够保证用户得到的是一个页面
			res.redirect("/error?msg=" + RESPONSETEXT["findDataErr"].data);
			return;
		}
		console.log(arr);
		res.render("main.ejs", {
			username: req.session.username,
			allUserInfoArr: arr
		});
	});
}

module.exports = main;