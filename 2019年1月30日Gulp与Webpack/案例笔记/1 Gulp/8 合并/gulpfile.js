var gulp = require("gulp");
var gulp_concat = require("gulp-concat");

gulp.task("default", function() {
	// gulp.src(["./origin/jquery.min.js", "./origin/bootstrap.min.js"])
	gulp.src("./origin/*.js")
	.pipe(gulp_concat("jb.js"))
	.pipe(gulp.dest("./publish"))
});