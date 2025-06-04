const fs = require("fs");
let stats = fs.statSync("ch15.txt");

console.log("isFile = ", stats.isFile());
console.log("isDirectory = ", stats.isDirectory());
console.log("size = ", stats.size);
console.log("atime = ", stats.atime);
console.log("mtime = ", stats.mtime);
console.log("gid = ", stats.gid);
console.log("uid = ", stats.uid);
console.log("mode = ", stats.mode.toString(8));
