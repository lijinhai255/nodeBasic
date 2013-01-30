console.log("hahahahahhaa")
var express = require("express");
// 配置路由方式二 由router去调用
var router = express.Router();
var login = require("./login");
var regist = require("./regist");
router.post("/login", login);
router.post("/regist", regist);

module.exports = router;