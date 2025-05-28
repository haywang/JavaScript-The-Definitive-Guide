const fs = require("fs");
const zlib = require("zlib");

function gzip(filename, callback) {
  let source = fs.createReadStream(filename);
  let destination = fs.createWriteStream(filename + ".gz");
  let gzipper = zlib.createGzip();
  source
    .on("error", callback)
    .pipe(gzipper)
    .pipe(destination)
    .on("error", callback)
    .on("finish", callback);
}

gzip("config.json", (err) => {
  if (err) {
    console.error("cb error:", err);
  } else {
    console.log("File compressed");
  }
});
