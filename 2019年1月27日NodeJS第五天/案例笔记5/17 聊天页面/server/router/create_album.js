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
var fs = require("fs");

// 创建相册
function create_album(req, res) {
	console.log(123)
	// 获取前端提交的内容
	var album_name = req.query.album_name;
	// 获取当前用户
	var username = req.session.username;
	// 在属于该用户的文件夹内创建该文件夹
	fs.mkdir("./albums/" + username + "/" + album_name, function(err) {
		if (err) {
			res.send(RESPONSETEXT["createFloderFailed"]);
			return;
		}
		// 相册集合中应当具备的字段：username、 album_name 
		var db = new DataBase(connect, dbName, coll);
		// 定义要插入的对象
		var data_obj = {
			username: username,
			album_name: album_name
		}
		db.insertOne(data_obj, function(err, result) {
			if (err) {
				res.send(RESPONSETEXT["failed"]);
				return;
			}
			res.send(RESPONSETEXT["success"]);
		});
	});
}


module.exports = create_album;