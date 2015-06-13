var uuid = require('node-uuid'),
    db = require('./database')

var result = function Action(){
  console.log("test")
  var apiKeys = generateApiKeys()
  return 'secret: ' + apiKeys[0] + '<br>api-key: ' + apiKeys[1]
}

module.exports = result

/*functions*/

function generateApiKeys(){
  var secret = uuid.v4()
  var api_key = uuid.v4()

  //db.callQuery("INSERT INTO users (secret, api_key) VALUES ('" + secret + "', '" + api_key + "');")

  return [uuid.v4(), uuid.v4()]
}
