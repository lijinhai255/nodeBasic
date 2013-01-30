var gulp = require("gulp");
var imagemin = require("gulp-imagemin");


gulp.task("default", function() {
	gulp.src("./origin/*.png")
	.pipe(imagemin())
	.pipe(gulp.dest("./publish/"))
})