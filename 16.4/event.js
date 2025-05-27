const EventEmitter = require("events")
const net = require("net")
let server = new net.Server()
console.log(server instanceof EventEmitter)

server.on("connection", (socket) => {
    console.log("someone connected!")
    socket.end("Hello World!", "utf8")
})

server.listen(8080, () => console.log("server bound"))