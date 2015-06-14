var pg = require('pg')

function Database() {
  this.host = null
  this.database = null
  this.user = null
  this.password = null

  this.sql_result = function(result){

  }

  this.callQuery = function(sql, sqlVars, result_callback){
    var conString = "postgres://" + this.user + ":" + this.password + "@" + this.host + "/" + this.database

    pg.connect((process.env.DATABASE_URL || conString), function(err, client, done) {
      console.log('--------------------'+sqlVars)
      client.query(sql, sqlVars, function(err, result) {
        console.log('--------------------'+err)
        result_callback(result)
        done()
        client.end()
      })
    })
  }
}

module.exports = new Database()
