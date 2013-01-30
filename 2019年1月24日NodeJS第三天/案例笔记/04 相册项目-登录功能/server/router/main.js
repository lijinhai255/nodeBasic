function main(req, res) {
	console.log(req.session);
	res.render("main.ejs", {
		username: req.session.username
	});
}

module.exports = main;