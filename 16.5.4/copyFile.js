const fs = require("fs");

function copyFile(sourceFilename, destinationFilename, callback) {
  let input = fs.createReadStream(sourceFilename);
  let output = fs.createWriteStream(destinationFilename);

  input.on("data", (chunk) => {
    let hasRoom = output.write(chunk);
    if (!hasRoom) {
      input.pause();
    }
  });

  input.on("end", () => {
    output.end();
  });

  input.on("error", (err) => {
    callback(err);
    process.exit();
  });

  output.on("drain", () => {
    input.resume();
  });

  output.on("error", (err) => {
    callback(err);
    process.exit();
  });

  output.on("finish", () => {
    callback(null);
  });
}

let from = process.argv[2],
  to = process.argv[3];
console.log(`Coping file ${from} to ${to}...`);
copyFile(from, to, (err) => {
  if (err) {
    console.error("cb error:", err);
  } else {
    console.log("File copied");
  }
});
