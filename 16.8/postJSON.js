const https = require("https");

function postJSON(host, endpoint, body, port, username, password) {
  return new Promise((resolve, reject) => {
    let bodyText = JSON.stringify(body);

    let requestOptions = {
      method: "GET",
      host: host,
      path: endpoint,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(bodyText),
      },
    };

    if (port) {
      requestOptions.port = port;
    }

    if (username && password) {
      requestOptions.auth = `${username}:${password}`;
    }

    let request = https.request(requestOptions);

    request.write(bodyText);
    request.end();

    request.on("error", (e) => reject(e));

    request.on("response", (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode}`));
        response.resume();
        return;
      }

      response.setEncoding("utf8");

      let body = "";
      response.on("data", (chunk) => {
        body += chunk;
      });

      response.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
  });
}

// https://jsonplaceholder.typicode.com/todos/1
postJSON("jsonplaceholder.typicode.com", "/todos/1", 443, null, null)
  .then((data) => {
    console.log("data = ", data);
  })
  .catch((e) => console.log("catch e = ", e));
