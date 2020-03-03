const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: 'gagedb',
  database: 'messages'
});

module.exports = pool;