var uuid = require('node-uuid'),
    db = require('./../database')

var action = function() {
  var apiKeys = generateApiKeys()
  return 'secret: ' + apiKeys[0] + '<br>api-key: ' + apiKeys[1]
}

module.exports = action()

/*functions*/

function generateApiKeys(){
  var secret = uuid.v4()
  var apiKey = uuid.v4()
  db.callQuery("INSERT INTO users (secret, api_key) VALUES ('$1', '$2');", [secret, apiKey])
  return [secret, apiKey]
}
