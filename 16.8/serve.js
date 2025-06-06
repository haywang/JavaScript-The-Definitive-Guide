const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

function serve(rootDirectory, port) {
  let server = new http.Server();
  server.listen(port);
  console.log("Listening on port", port);

  server.on("request", (request, response) => {
    let endpoint = url.parse(request.url).pathname;

    if (endpoint === "/test/mirror") {
      console.log("/test/mirror");
      response.setHeader("Content-Type", "text/plain; charset=UTF-8");
      response.writeHead(200);
      response.write(
        `${request.method} ${request.url} HTTP /${request.httpVersion}\r\n`
      );

      let headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }

      response.write("\r\n");
      response.pipe(response);
    } else {
      let filename = endpoint.substring(1);
      filename = filename.replace(/\.\.\//g, "");
      filename = path.resolve(rootDirectory, filename);

      let type;
      switch (path.extname(filename)) {
        case ".html":
        case ".htm":
          type = "text/html";
          break;
        case ".js":
          type = "text/javascript";
          break;
        case ".css":
          type = "text/css";
          break;
        case ".png":
          type = "image/png";
          break;
        case ".txt":
          type = "text/plain";
          break;
        default:
          type = "application/octet-stream";
          break;
      }

      let stream = fs.createReadStream(filename);
      stream.once("readable", () => {
        response.setHeader("Content-Type", type);
        response.writeHeader(200);
        stream.pipe(response);
      });

      stream.on("error", (err) => {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.writeHead(404);
        response.end(err.message);
      });
    }
  });
}

serve("/Users/wanghao/Documents/", 3000);
