const fs = require("fs");

async function parseFile(filename) {
  let stream = fs.createReadStream(filename, { encoding: "utf-8" });
  let line = 0;
  for await (let chunk of stream) {
    line++;
    console.log(line, chunk);
  }
}

parseFile("./sample.txt").catch((err) => console.error(err));
