
function cut(req, res) {
	// 渲染一个页面给用户
	res.render("cut.ejs", {
		username: req.session.username,
		head_pic: req.session.head_pic,
		navArr: req.session.navArr
	});
}
module.exports = cut;