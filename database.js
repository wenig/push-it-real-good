var pg = require('pg')

function Database() {
  this.host = null
  this.database = null
  this.user = null
  this.password = null

  this.sql_result = function(result){

  }

  this.callQuery = function(sql, sqlVars, callback){
    var conString = "postgres://" + this.user + ":" + this.password + "@" + this.host + "/" + this.database

    pg.connect((process.env.DATABASE_URL || conString), function(err, client, done) {
      client.query(sql, sqlVars, function(err, result) {
        done()
        callback(result)
        client.end()
      })
    })
  }
}

module.exports = new Database()
