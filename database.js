var pg = require('pg')

function Database() {
  this.host = null
  this.database = null
  this.user = null
  this.password = null

  this.callQuery = function(sql){
    var conString = "postgres://" + this.user + ":" + this.password + "@" + this.host + "/" + this.database
    query((process.env.DATABASE_URL || conString), sql)
  }

  function query(conString, sql){
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err)
      }

      client.query(sql, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
          return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
      })
    })
  }
}

module.exports = new Database()
