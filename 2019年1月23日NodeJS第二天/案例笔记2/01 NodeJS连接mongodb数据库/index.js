// 服务器是服务器 数据库是数据库 
// 这两个都是应用程序 
// 现在我们要让一个应用程序去操作另外一个应用程序
// NodeJS里有很多第三方模块，用于操作MongoDB数据库的有mongodb、mongoose模块
// mongodb模块很简单 因为它就是在调用mongodb数据库的自身api 
// mongoose模块使用的是关系型数据库的思想去操作mongodb数据库

// 开始使用
var mongodb = require("mongodb");
// 获取连接客户端
var MongoClient = mongodb.MongoClient;
// 定义连接字符串
var connectStr = "mongodb://localhost:27017";
// 开始连接
MongoClient.connect(connectStr, {useNewUrlParser: true}, function(err, client) {
	// 判断连接是否成功
	if (err) {
		// 连接失败
		console.log("连接失败");
		console.log(err);
		return;
	}
	// 连接成功
	// 确定操作哪个数据库
	var db = client.db("album");
	// 确定操作哪个集合
	var coll = db.collection("users");
	// 通过coll调用find方法、调用update方法、调用remove方法等
	coll.findOne({}, function(err, result) {
		// 关闭数据库连接
		client.close();
		// 判定是否出错
		if (err) {
			console.log("查询数据失败");
			console.log(err);
			return;
		}
		// 成功 输出
		console.log(result);
	});
});