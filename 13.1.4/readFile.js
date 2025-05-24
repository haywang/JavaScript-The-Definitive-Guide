const fs = require("fs");
let options = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
};

fs.readFile("config.json", "utf-8", (err, text) => {
  if (err) {
    console.warn("Could not read config file:", err);
  } else {
    Object.assign(options, JSON.parse(text));
  }

  console.log(options);
});
