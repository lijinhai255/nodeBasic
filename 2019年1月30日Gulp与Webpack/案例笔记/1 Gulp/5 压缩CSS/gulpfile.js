// 引入gulp
var gulp = require("gulp");
// 引入压缩CSS的插件
var clean = require("gulp-clean-css");

// 定义任务
gulp.task("default", function() {
	// 定位资源
	gulp.src("./origin/*.css")
	// 定义操作 压缩
	.pipe(clean())
	// 定义操作 发布
	.pipe(gulp.dest("./publish/"));
});