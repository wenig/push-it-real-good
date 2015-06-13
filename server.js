var WebSocketServer = require('ws').Server,
    PushItRealGood = require('./push_it_real_good'),
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 5000

    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    var jsonParser = bodyParser.json()

app.get('/', function(req, res) {
  res.send('hello world')
})

app.post('/', jsonParser, function(req, res){
  res.send(PushItRealGood.go(req.body.auth_tokens, req.body.secret, req.body.api_key, req.body.message))
})

app.get('/generate_api_key', function(req, res){
  res.send(require('./endpoints/generate_api_key'))
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
