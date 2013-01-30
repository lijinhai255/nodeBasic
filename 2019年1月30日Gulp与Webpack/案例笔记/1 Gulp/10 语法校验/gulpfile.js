var gulp = require("gulp");
var jslint = require("gulp-jslint");


gulp.task("default", function() {
	gulp.src("./origin/a.js")
	.pipe(jslint())
	.pipe(jslint.reporter("default"))
});