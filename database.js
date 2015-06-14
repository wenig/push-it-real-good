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
      if(err) {
        return console.error('error fetching client from pool', err)
      }

      client.query(sql, sqlVars, function(err, result) {
        result_callback(result)
        console.log(sql)
        done();

        if(err) {
          return console.error('error running query', err);
        }

        client.end()
      })
    })
  }
}

module.exports = new Database()
