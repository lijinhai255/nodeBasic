var gulp = require("gulp");
var minify = require("gulp-minify-html");


gulp.task("default", function() {
	gulp.src("./origin/*.html")
	.pipe(minify())
	.pipe(gulp.dest("./publish"))
})