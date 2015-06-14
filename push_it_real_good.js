function PushItRealGood() {
  this.clientConnections = {}

  this.webSocketServer = null

  this.go = function(authToken, secret, apiKey, message){
    console.log(this.clientConnections)
    console.log('--------------------')
    console.log(this.clientConnections[apiKey])
    console.log('--------------------')
    console.log(this.clientConnections[apiKey]['auth'+authToken])
    this.clientConnections[apiKey]['auth'+authToken].send(message)
  }

  this.register = function(apiKey, authToken, connection){
    if(this.clientConnections[apiKey]){
      this.clientConnections[apiKey]['auth'+authToken] = connection
    }else{
      this.clientConnections[apiKey] = []
      this.clientConnections[apiKey]['auth'+authToken] = connection
    }
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
