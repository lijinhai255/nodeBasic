// 引入formidable
var formidable = require("formidable");
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
// 引入fs
var fs = require("fs");

// 处理上传图片
function uploadImg(req, res) {
	// 获取用户名
	var username = req.session.username;
	// 获取formidable的实例
	var form = new formidable();
	// 设置临时上传路径
	form.uploadDir = "./uploads";
	// 解析
	form.parse(req, function(err, fields, files) {
		// 判定是否出错
		if (err) {
			res.send(RESPONSETEXT["uploadFileErr"]);
			return;
		}
		// 获取目标相册的名称
		var album_name = fields.album_name;
		// 获取上传上来的图片的临时路径
		var oldPath = files.file.path;
		// 改名
		// 定义老路径 就是上传的临时路径 已获取
		// 定义新路径 就是albums/用户名/目标相册名/图片原始名称
		var newPath = "./albums/" + username + "/" + album_name + "/" + files.file.name;
		fs.rename(oldPath, newPath, function(err) {
			// 判定是否出错
			if (err) {
				res.send(RESPONSETEXT["renameFileFailed"]);
				return;
			}
			// 将图片的信息插入数据库
			var img_obj = {
				username: username,
				album_name: album_name,
				img_name: files.file.name,
				display: "true"
			}
			// 初始化数据库对象
			var db = new DataBase(connect, dbName, coll);
			// 插入一条信息
			db.insertOne(img_obj, function(err, result) {
				if (err) {
					res.send(RESPONSETEXT["insertDataErr"]);
					return;
				}
				res.send(RESPONSETEXT["success"]);
			});
		});
	});
}

module.exports = uploadImg;