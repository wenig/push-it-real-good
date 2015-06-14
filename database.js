var pg = require('pg')

function Database() {
  this.host = null
  this.database = null
  this.user = null
  this.password = null

  this.callQuery = function(sql){
    var conString = "postgres://" + this.user + ":" + this.password + "@" + this.host + "/" + this.database
    var test = query((process.env.DATABASE_URL || conString), sql)
    console.log("----query-result---- "+test)
  }

  function query(conString, sql){
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err)
      }

      client.query(sql, sqlVars, function(err, result) {
        console.log(sql)
        done();

        if(err) {
          return console.error('error running query', err);
        }

        client.end()
        return result
      })
    })
  }
}

module.exports = new Database()
