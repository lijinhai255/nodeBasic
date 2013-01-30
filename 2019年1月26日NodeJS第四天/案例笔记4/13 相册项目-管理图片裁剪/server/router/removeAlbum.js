// 引入删除非空目录的模块
var rm = require("../tools/rm");
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
var coll1 = CONST("COLLECTIONS").tupian;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");
function removeAlbum(req, res) {
	// 获取目标文件夹
	var album_name = req.query.album_name;
	// 移除
	rm("./albums/" + req.session.username + "/" + album_name);
	// 此时已经移除了物理路径 接下来是移除数据库中的数据
	var db = new DataBase(connect, dbName, coll);
	// 定义移除条件
	var query = {
		album_name: album_name,
		username: req.session.username
	}
	// 调用移除一条方法
	db.deleteOne(query, function(err, result) {
		if (err) {
			res.send(RESPONSETEXT["deleteDataErr"]);
			return;
		}
		var db1 = new DataBase(connect, dbName, coll1);
		db1.deleteMany(query, function(err, result) {
			if (err) {
				res.send(RESPONSETEXT["deleteDataErr"]);
				return;
			}
			res.send(RESPONSETEXT["success"]);
		});
	});
}

module.exports = removeAlbum;