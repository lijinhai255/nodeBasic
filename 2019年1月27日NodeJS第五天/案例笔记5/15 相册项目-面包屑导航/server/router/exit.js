function exit(req, res) {
	// 当点击的时候 说明用户要退出了 清空session即可 跳转页面
	req.session.username = "";
	req.session.head_pic = "";
	req.session.navArr = [];
	// 跳转
	res.redirect("/web/index.html");
}

module.exports = exit;