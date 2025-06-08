const child_process = require("child_process");

// let listing = child_process.execSync("ls -l", { encoding: "utf8" });
// console.log(listing);

let listing = child_process.execFileSync("ls", ["-l"], { encoding: "utf8" });
console.log(listing);
