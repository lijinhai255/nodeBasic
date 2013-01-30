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
var yonghu = CONST("COLLECTIONS").yonghu;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");



function main(req, res) {
	// 渲染main.ejs给用户看
	res.render("main.ejs", {
		username: req.session.username,
		head_pic: req.session.head_pic
	})
}

module.exports = main;