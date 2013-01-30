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

// 获取用户相册内的文件
function getAlbumImgs(req, res) {
	// 获取提交过来的相册名称
	var album_name = req.query.album_name;
	// 去图片数据库中查询所有属于该用户的该相册下的信息
	var db = new DataBase(connect, dbName, coll);
	// 定义查询条件
	var query = {
		username: req.session.username,
		album_name: album_name
	};
	// 查询多条数据
	db.findMany(query, function(err, arr) {
		if (err) {
			res.send(RESPONSETEXT["findDataErr"]);
			return;
		}
		var path_arr = arr.map(function(value) {
			return {
				src: "/albums/" + value.username + "/" + value.album_name + "/" + value.img_name,
				display: value.display,
				img_name: value.img_name
			};
		});
		res.send({
			error: 0,
			data: path_arr
		});
	});
}
module.exports = getAlbumImgs;