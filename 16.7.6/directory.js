const fs = require("fs");
const os = require("os");
const path = require("path");
// fs.mkdirSync("dist/lib", { recursive: true });

// let tempDirPath;
// try {
//   //   console.log("tmpdir = ", os.tmpdir());
//   //   console.log("path.join = ", path.join(os.tmpdir(), "d"));
//   tempDirPath = fs.mkdtempSync(path.join(os.tmpdir(), "d"));
//   console.log("tempDirPath = ", tempDirPath);
// } finally {
//   fs.rmdirSync(tempDirPath);
// }

// let tempFiles = fs.readdirSync("/Users/wanghao/Documents");
// console.log("tempFiles = ", tempFiles);

// fs.promises
//   .readdir("/Users/wanghao/Documents", { withFileType: true })
//   .then((entries) => {
//     console.log(entries);
//     entries
//       //   .filter((entry) => entry.isDirectory())
//       //   .map((entry) => entry.name)
//       .forEach((name) => {
//         name && console.log(path.join("/Users/wanghao/Documents/", name));
//       });
//   })
//   .catch(console.error);

async function listDirectory(dirpath) {
  let dir = await fs.promises.opendir(dirpath);
  for await (let entry of dir) {
    let name = entry.name;
    if (entry.isDirectory()) {
      name += "/";
    }
    let stats = await fs.promises.stat(path.join(dirpath, name));
    let size = stats.size;
    console.log(String(size).padStart(10), name);
  }
}

listDirectory("/Users/wanghao/Documents");
