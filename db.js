// connects database to server

const Pool = require("pg").Pool;

const pool = new Pool({
  "user": "vrushankkekre",
  "password": "password1",
  "host": "localhost",
  "port": 5432,
  "database": "nodelogin"
});

module.exports = pool;

