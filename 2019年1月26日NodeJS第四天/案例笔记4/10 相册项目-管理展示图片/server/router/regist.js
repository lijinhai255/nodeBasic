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
// 引入fs
var fs = require("fs");

// 定义用户注册处理函数
function regist(req, res) {
	// 获取用户提交的信息
	var username = req.body.username;
	var password = req.body.password;
	// 给用户创建一个专属文件夹
	fs.mkdir("./albums/" + username, function(err) {
		if (err) {
			// 创建失败
			// 给前端一个响应
			res.send(RESPONSETEXT["createFloderFailed"]);
			return;
		}
		// 如果代码可以执行到这里说明创建成功
		// 创建用户的头像相册
		fs.mkdir("./albums/" + username + "/head_pic", function(err) {
			if (err) {
				// 创建失败
				// 给前端一个响应
				res.send(RESPONSETEXT["createFloderFailed"]);
				return;
			}
			// 给用户放一张默认头像图片
			fs.readFile("./web/imgs/default.jpg", function(err, data) {
				if (err) {
					res.send(RESPONSETEXT["readFileFailed"]);
					return;
				}
				fs.appendFile("./albums/" + username + "/head_pic/default.jpg", data,  function(err) {
					if (err) {
						res.send(RESPONSETEXT["appendFileFailed"]);
						return;
					}
					// 连接数据库
					var db = new DataBase(connect, dbName, coll);
					// 定义被插入的信息对象
					var user_info = {
						username: username,
						password: password,
						head_pic: "/albums/" + username + "/head_pic/default.jpg"
					}
					db.insertOne(user_info, function(err, result) {
						if (err) {
							res.send(RESPONSETEXT["registFailed"]);
							return;
						}
						res.send(RESPONSETEXT["success"]);
					})
				})
			})
		})
	})
}

// 暴露
module.exports = regist;