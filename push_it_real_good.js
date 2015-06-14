var db = require('./database')

function PushItRealGood() {
  var clientConnections = {}

  this.webSocketServer = null

  this.go = function(authToken, secret, apiKey, message){
    var matchedKey = apiKey + secret
    console.log(clientConnections)
    console.log(matchedKey)
    clientConnections[matchedKey][authToken].send(message)
  }

  this.register = function(apiKey, authToken, connection){
    registerApiSecret(apiKey, function(secret){
      var matchedKey = apiKey + secret
      if(clientConnections[matchedKey]){
        clientConnections[matchedKey][authToken] = connection
      }else{
        clientConnections[matchedKey] = {}
        clientConnections[matchedKey][authToken] = connection
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
    return db.callQuery("SELECT secret FROM users WHERE api_key = $1;", [apiKey], function(result){
      callback(result.rows[0].secret)
    })
  }
}

module.exports = new PushItRealGood()
