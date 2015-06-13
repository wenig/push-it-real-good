var ws = require("nodejs-websocket"),
    clientConnections = {}

/*server*/

var server = ws.createServer(function (conn) {
  console.log("Connection opened")

  conn.on("text", function (str) {
    console.log(str)
    clientConnections[str] = conn.key
  })

  conn.on("close", function (code, reason) {
    console.log("Connection closed")
  })
}).listen(8001)

/*websocket*/

function broadcast(server, sender, msg) {
  server.connections.forEach(function (conn) {
    if(sender != conn){
      conn.sendText(msg)
    }
  })
}
