var WebSocketServer = require("ws").Server,
    http = require("http"),
    express = require("express"),
    app = express(),
    port = process.env.PORT || 5000,
    clientConnections = {}

app.get('/', function(req, res) {
  res.send('hello world')
})

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  console.log("websocket connection open: "+ws.key)

  ws.on("text", function (str) {
    console.log(str)
    clientConnections[str] = conn.key
  })

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})

/*functions*/

function broadcast(server, sender, msg) {
  server.connections.forEach(function (conn) {
    if(sender != conn){
      conn.sendText(msg)
    }
  })
}
