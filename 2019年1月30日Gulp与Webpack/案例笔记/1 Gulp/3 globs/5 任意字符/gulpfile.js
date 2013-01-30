var gulp = require("gulp");

gulp.task("default", function() {
	gulp.src("./origin/a?.js")
	.pipe(gulp.dest("./publish"))
})