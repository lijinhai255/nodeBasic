// 引入gulp
var gulp = require("gulp");
// 定义任务
gulp.task("default", function() {
// 定位资源
gulp.src("./origin/**/*.js")
.pipe(gulp.dest("./publish"));
});
