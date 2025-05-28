const os = require("os");

console.log("process.cwd(): ", process.cwd());
console.log("__filename: ", __filename);
console.log("__dirname: ", __dirname);
console.log("os.homedir(): ", os.homedir());

const path = require("path");

console.log("path.basename(): ", path.basename(__filename));
console.log("path.dirname(): ", path.dirname(__filename));
console.log("path.extname(): ", path.extname(__filename));
console.log("path.parse(): ", path.parse(__filename));
console.log("path.format(): ", path.format(path.parse(__filename)));
console.log("path.isAbsolute(): ", path.isAbsolute(__filename));
console.log("path.join(): ", path.join(__dirname, "test"));
console.log("path.resolve(): ", path.resolve(__dirname, "test"));
console.log("path.relative(): ", path.relative(__dirname, "test"));
console.log("path.normalize(): ", path.normalize(__dirname + "/test"));
console.log("path.delimiter: ", path.delimiter);
console.log("path.sep: ", path.sep);
