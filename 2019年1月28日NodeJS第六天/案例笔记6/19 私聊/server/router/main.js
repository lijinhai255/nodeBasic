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
var xiangce = CONST("COLLECTIONS").xiangce;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");
// 引入fs
var fs = require("fs");


function main(req, res) {
	// 先去数据库中查询所有用户的信息
	var coll = new DataBase(connect, dbName, yonghu);
	// 获取登录用户
	var username = req.session.username;
	coll.findMany({}, function(err, allUserInfoArr) {
		if (err) {
			// 重定向到错误处理路由 该路由会返回一个错误信息页面给用户 能够保证用户得到的是一个页面
			res.redirect("/error?msg=" + RESPONSETEXT["findDataErr"].data);
			return;
		}
		// // 查询所有的相册 
		var coll1 = new DataBase(connect, dbName, xiangce);
		coll1.findMany({username: username}, function(err, userAlbumArr) {
			if (err) {
				// 重定向到错误处理路由 该路由会返回一个错误信息页面给用户 能够保证用户得到的是一个页面
				res.redirect("/error?msg=" + RESPONSETEXT["findDataErr"].data);
				return;
			}
			// 读取./web/face 下所有内容
			fs.readdir("./web/face", function(err, arr) {
				if (err) {
					res.redirect("/error?msg=" + RESPONSETEXT["readFileFailed"].data);
					return;
				}
				var pathArr = arr.map(function(value) {
					return {
						code: "\\" + value.split(".").shift(),
						path: "/web/face/" + value
					};
				});
				res.render("main.ejs", {
					username: req.session.username,
					head_pic: req.session.head_pic,
					navArr: req.session.navArr,
					faceArr: pathArr,
					allUserInfoArr: allUserInfoArr,
					userAlbumArr: userAlbumArr
				});
			});
		});
	});
}

module.exports = main;