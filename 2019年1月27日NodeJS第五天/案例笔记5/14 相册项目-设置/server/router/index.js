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
var uploadImg = require("./uploadImg");
var removeAlbum = require("./removeAlbum");
var getAlbumImgs = require("./getAlbumImgs");
var renameImg = require("./renameImg");
var changeImgState = require("./changeImgState");
var one_people_albums = require("./one_people_albums");
var one_people_album = require("./one_people_album");
var cut = require("./cut");
var caijian = require("./caijian");
var updateUserInfo = require("./updateUserInfo");
var updateHeadPic = require("./updateHeadPic");
var nav_check = require("./nav_check");
// 配置每一个接口
router.get("*", nav_check);
router.get("/checkName", checkName);
router.post("/regist", regist);
router.post("/login", login);
router.get("/main", main);
router.get("/error", error);
router.post("/uploadImg", uploadImg);
router.get("/create_album", create_album);
router.get("/removeAlbum", removeAlbum);
router.get("/getAlbumImgs", getAlbumImgs);
router.get("/renameImg", renameImg);
router.get("/changeImgState", changeImgState);
router.get("/one_people_albums", one_people_albums);
router.get("/one_people_album", one_people_album);
router.get("/cut", cut);
router.get("/caijian", caijian);
router.get("/updateUserInfo", updateUserInfo);
router.post("/updateHeadPic", updateHeadPic);
// 暴露函数出去
module.exports = function(app) {
	app.use(router);
}