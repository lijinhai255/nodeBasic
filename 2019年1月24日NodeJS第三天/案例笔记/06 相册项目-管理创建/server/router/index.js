// 获取express 
var express = require("express");
// 获取Router
var router = express.Router();

// 引入接口函数
var checkName = require("./checkName");
var regist = require("./regist");
var login =  require("./login");
var main = require("./main");
var error = require("./error");
var create_album = require("./create_album");
// 配置每一个接口
router.get("/checkName", checkName);
router.post("/regist", regist);
router.post("/login", login);
router.get("/main", main);
router.get("/error", error);
router.get("/create_album", create_album);
// 暴露函数出去
module.exports = function(app) {
	app.use(router);
}