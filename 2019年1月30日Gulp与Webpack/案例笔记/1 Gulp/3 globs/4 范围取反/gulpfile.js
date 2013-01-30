var gulp = require("gulp");

gulp.task("default", function() {
	gulp.src("./origin/[^abc].js")
	.pipe(gulp.dest("./publish"))
})