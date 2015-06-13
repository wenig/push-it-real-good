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

app.post('/push', function(req, res){
  console.log(req.params)
  res.send(PushItRealGood.go(req.params.auth_tokens, req.params.secret, req.params.api_key, req.params.message))
})

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

PushItRealGood.webSocketServer = new WebSocketServer({server: server})
console.log("websocket server created")

PushItRealGood.webSocketServer.on("connection", function(ws) {
  console.log(this.connections)

  ws.on("text", function (str) {
    console.log(str)
    PushItRealGood.clientConnections[str] = ws.key
  })

  ws.on("close", function() {
    console.log("websocket connection close")
  })
})
