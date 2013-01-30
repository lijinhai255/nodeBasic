// 引入
var gulp = require("gulp");

// 定义任务1
// gulp.task("task1", function() {
// 	console.log("1111");
// });


// 定义任务2
// gulp.task("task2", function() {
// 	console.log(22222);
// });

// 定义默认任务
// gulp.task("default", ["task1", "task2"]);

// 演示src
// gulp.task("default", function() {
	// 字符串
	// gulp.src("./origin/index.html")
	// 数组
	// gulp.src(["./origin/index.html"])
	// glob
	// gulp.src("./origin/*.html")


	// // 发布到publish下
	// .pipe(gulp.dest("./publish/"));
// });


// 演示watch
gulp.task("default", function() {
	// 字符串
	gulp.src("./origin/index.html")
	// 发布到publish下
	.pipe(gulp.dest("./publish/"));
});


// 调用watch
// gulp.watch("./origin/index.html", ["default"]);
gulp.watch("./origin/index.html", function() {
	console.log("发生变化了");
});