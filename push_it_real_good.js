function PushItRealGood() {
  this.clientConnections = {}

  this.webSocketServer = null

  this.go = function(authTokens, secret, apiKey, message){
    console.log(message)
  }

  this.broadcast = function(server, sender, msg) {
    server.connections.forEach(function (conn) {
      if(sender != conn){
        conn.sendText(msg)
      }
    })
  }
}

module.exports = new PushItRealGood()
