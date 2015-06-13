function PushItRealGood() {
  this.clientConnections = {}

  this.broadcast = function broadcast(server, sender, msg) {
    server.connections.forEach(function (conn) {
      if(sender != conn){
        conn.sendText(msg)
      }
    })
  }
}

module.exports = new PushItRealGood()
