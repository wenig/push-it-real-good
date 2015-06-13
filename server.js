var ws = require("nodejs-websocket"),
    express = require('express'),
    app = express(),
    clientConnections = {}

/*server*/

app.get('/', function(req, res) {
  res.send('hello world')
})

app.listen(process.env.PORT || 3000)

/*websocket*/

var server = ws.createServer(function (conn) {
  console.log("Connection opened")

  conn.on("text", function (str) {
    console.log(str)
    clientConnections[str] = conn.key
  })

  conn.on("close", function (code, reason) {
    console.log("Connection closed")
  })
}).listen(process.env.PORT || 5000)

/*functions*/

function broadcast(server, sender, msg) {
  server.connections.forEach(function (conn) {
    if(sender != conn){
      conn.sendText(msg)
    }
  })
}
