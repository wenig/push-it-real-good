var db = require('./database')

function PushItRealGood() {
  this.clientConnections = {}

  this.webSocketServer = null

  this.go = function(authToken, secret, apiKey, message){
    this.clientConnections[apiKey+secret][authToken].send(message)
  }

  this.register = function(apiKey, authToken, connection){
    var matchedKey = apiKey + getSecret(apiKey)

    if(this.clientConnections[matchedKey]){
      this.clientConnections[matchedKey][authToken] = connection
    }else{
      this.clientConnections[matchedKey] = {}
      this.clientConnections[matchedKey][authToken] = connection
    }
  }

  this.broadcast = function(server, sender, msg) {
    server.connections.forEach(function (conn) {
      if(sender != conn){
        conn.sendText(msg)
      }
    })
  }

  function getSecret(apiKey){
    return db.callQuery("SELECT SINGLE secret FROM users WHERE api_key = '$1';", [apiKey]).rows[0].secret
  }
}

module.exports = new PushItRealGood()
