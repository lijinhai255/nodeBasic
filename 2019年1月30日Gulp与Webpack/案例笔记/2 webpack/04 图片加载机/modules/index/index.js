var img1 = require("./bd_logo1.png");
var img2 = require("./head_pic.jpg");

var imgElement1 = new Image();
imgElement1.src = img1;
var imgElement2 = new Image();
imgElement2.src = img2;

document.body.appendChild(imgElement1);
document.body.appendChild(imgElement2);