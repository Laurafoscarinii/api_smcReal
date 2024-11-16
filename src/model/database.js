const mysql = require('mysql2/promise');

let connection;

async function connect() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: '108.179.193.178',  
      port: '3306',
      user: 'wayin756_smcuser',
      password: '2jqZrDY5NwCn5Aq8',
      database: 'wayin756_smcdb',
      connectTimeout: 10000 
    });
  }
  return connection;
}

async function query(sql, values = []) {
  const conn = await connect();
  const [rows] = await conn.query(sql, values);
  return rows;
}

module.exports = { query };


