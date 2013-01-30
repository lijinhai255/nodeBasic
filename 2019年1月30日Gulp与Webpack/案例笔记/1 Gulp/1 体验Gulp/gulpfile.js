// 既然是NodeJS的第三方模块 而当前又是一个js文件 
var gulp = require("gulp");
console.log(gulp);

// gulp执行的时候使用的是定义任务 执行任务的方式
gulp.task("default", function() {
	gulp.src("./origin/index.html")
	.pipe(gulp.dest("./publish"));
});