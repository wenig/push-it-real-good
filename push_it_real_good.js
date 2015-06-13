function PushItRealGood() {
  this.clientConnections = {}

  this.webSocketServer = null

  this.go = function(authTokens, secret, apiKey, message){
    this.clientConnections[apiKey][authToken].send(message)
  }

  this.register = function(apiKey, authToken, connection){
    if(this.clientConnections[apiKey]){
      this.clientConnections[apiKey][authToken] = connection
    }else{
      this.clientConnections[apiKey] = []
      this.clientConnections[apiKey][authToken] = connection
    }
    console.log(apiKey+': '+authToken)
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
