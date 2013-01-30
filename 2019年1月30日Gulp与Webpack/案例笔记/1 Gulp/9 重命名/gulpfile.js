var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task("default", function() {
	gulp.src("./origin/*.js")
	.pipe(uglify())
	.pipe(rename({
		prefix: "ickt.",
		suffix: ".min."
	}))
	.pipe(gulp.dest("./publish"))
});