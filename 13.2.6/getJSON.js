const https = require("https");

function getJSON(url) {
  return new Promise((resolve, reject) => {
    request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode}`));
        response.resume();
      } else if (
        !response.headers["content-type"].includes("application/json")
      ) {
        console.log(response.headers["content-type"]);
        reject(new Error("Invalid content-type"));
        response.resume();
      } else {
        let data = "";
        response.setEncoding("utf-8");
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            let parsed = JSON.parse(data);
            resolve(parsed);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    request.on("error", (err) => {
      reject(err);
    });
  });
}

getJSON("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => console.log("data = ", data))
  .catch((e) => console.error("catch = ", e));
