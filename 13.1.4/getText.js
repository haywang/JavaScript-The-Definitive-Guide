const https = require("https");

function getText(url, callback) {
  request = https.get(url);

  request.on("response", (response) => {
    let httpStatus = response.statusCode;
    response.setEncoding("utf-8");
    let body = "body:";

    response.on("data", (chunk) => {
      //   console.log("chunk=", chunk);
      body += chunk;
    });

    response.on("end", () => {
      if (httpStatus === 200) {
        callback(null, body);
      } else {
        callback(httpStatus, null);
      }
    });
  });

  request.on("error", (err) => {
    callback(err, null);
  });
}

getText("https://www.google.com", (err, text) => {
  console.log(err, text);
});
