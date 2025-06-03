const fs = require("fs");

// fs.copyFileSync("ch15.txt", "ch15.bak");

// fs.copyFile("ch15.txt", "ch16.txt", fs.constants.COPYFILE_EXCL, (err) => {
//   if (err) {
//     console.error("cb error:", err);
//   } else {
//     console.log("File copied");
//   }
// });

// fs.renameSync("ch15.bak", "backups/ch15.bak");

fs.unlinkSync("backups/ch15.bak");
