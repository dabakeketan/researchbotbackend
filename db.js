// connects database to server

const Pool = require("pg").Pool;

const pool = new Pool({
  "user": "postgres",
  "password": "Ulwe@104",
  "host": "localhost",
  "port": 5432,
  "database": "researchbot"
});

module.exports = pool;

