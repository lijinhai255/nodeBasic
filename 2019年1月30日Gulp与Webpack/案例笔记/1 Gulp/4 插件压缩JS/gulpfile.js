// 引入gulp
var gulp = require("gulp");
// 引入压缩JS的插件
var uglify = require("gulp-uglify");

// 定义任务
gulp.task("default", function() {
	// 定位资源
	gulp.src("./origin/*.js")
	// 定义操作 压缩
	.pipe(uglify({mangle: true}))
	// 定义操作 发布
	.pipe(gulp.dest("./publish/"));
});