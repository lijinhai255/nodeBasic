var accordingTable = {
	"/main": "主页",
	"/one_people_albums": "用户文件夹",
	"/one_people_album": "相册图片" 
}
var url = require("url");

// 本接口负责的是页面之间的跳转监听 主要用于调整前端的面包屑导航
function nav_check(req, res, next) {
	// 根据 req.url 决定将哪个文字放入面包屑导航数组
	var pathname = url.parse(req.url).pathname;
	for (var i = 0; i < req.session.navArr.length; i++) {
		if (req.session.navArr[i] === accordingTable[pathname]) {
			req.session.navArr.length = i;
			break;
		}
	}
	req.session.navArr.push(accordingTable[pathname]);
	console.log(req.session.navArr);
	next();
}
module.exports = nav_check;