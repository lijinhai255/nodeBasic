// 获取express 
var express = require("express");
// 获取Router
var router = express.Router();

// 引入接口函数
var checkName = require("./checkName");
// 配置每一个接口
router.get("/checkName", checkName);
// 暴露函数出去
module.exports = function(app) {
	app.use(router);
}