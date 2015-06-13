var WebSocketServer = require('ws').Server,
    PushItRealGood = require('./push_it_real_good'),
    http = require('http'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 5000

app.get('/', function(req, res) {
  res.send('hello world')
})

app.get('/generate_api_key', function(req, res){
  res.send(require('./endpoints/generate_api_key'))
})

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created: \n"+wss)

wss.on("connection", function(ws) {
  console.log("websocket connection open: \n"+ws)

  ws.on("text", function (str) {
    console.log(str)
    PushItRealGood.clientConnections[str] = ws.key
  })

  ws.on("close", function() {
    console.log("websocket connection close")
  })
})
