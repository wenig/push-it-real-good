var db = require('./database')

function PushItRealGood() {
  this.clientConnections = {}

  this.webSocketServer = null

  this.go = function(authToken, secret, apiKey, message){
    this.clientConnections[apiKey+secret][authToken].send(message)
  }

  this.register = function(apiKey, authToken, connection){
    registerApiSecret(apiKey, function(secret){
      var matchedKey = apiKey + secret
      if(this.clientConnections[matchedKey]){
        this.clientConnections[matchedKey][authToken] = connection
      }else{
        this.clientConnections[matchedKey] = {}
        this.clientConnections[matchedKey][authToken] = connection
      }
    })
  }

  this.broadcast = function(server, sender, msg) {
    server.connections.forEach(function (conn) {
      if(sender != conn){
        conn.sendText(msg)
      }
    })
  }

  function registerApiSecret(apiKey, callback){
    return db.callQuery("SELECT secret FROM users WHERE api_key = '$1';", [apiKey], function(result){
      callback(result.row[0].secret)
    })
  }
}

module.exports = new PushItRealGood()
