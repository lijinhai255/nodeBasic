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
var coll = CONST("COLLECTIONS").yonghu;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");
// fs
var fs = require("fs");
function updateHeadPic(req, res) {
	// 获取用户名
	var username = req.session.username;
	// 解析数据
	var form = new formidable();
	// 设置临时文件夹路径
	form.uploadDir = "./uploads";
	// 解析
	form.parse(req, function(err, fields, files) {
		if (err) {
			res.send(RESPONSETEXT["uploadFileErr"]);
			return;
		}
		// 获取旧路径
		var oldPath = files.file.path;
		// 定义新名称
		var newName = files.file.name;
		// 定义新路径
		var newPath = "./albums/" + username + "/head_pic/" + newName;
		// 重命名
		fs.rename(oldPath, newPath, function(err) {
			if (err) {
				res.send(RESPONSETEXT["renameFileFailed"]);
				return;
			}
			// 将新的路径放入数据库
			var db = new DataBase(connect, dbName, coll);
			// 定义查询对象 因为用户名是唯一的所以根据用户名查询
			var query = {
				username: username
			};
			// 定义修改对象 
			var update = {
				head_pic: newPath.slice(1)
			};
			// 修改数据库中的head_pic字段
			db.updateOne(query, {$set: update}, function(err, result) {
				if (err) {
					res.send(RESPONSETEXT["failed"]);
					return;
				}
				req.session.head_pic = update.head_pic;
				res.send({
					error: 0,
					data: RESPONSETEXT["success"].data,
					head_pic: update.head_pic
				});
			});
		});
	});
}

module.exports = updateHeadPic;