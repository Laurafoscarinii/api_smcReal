
const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
    host: '10.0.1.85',
    port: '3306',
    user: 'laura',
    password: 'laura',
    database: 'mydb',
    connectTimeout: 10000 
  });

  global.connection = connection;
  return connection;
}

async function query(sql, values = []) {  
  const conn = await connect();
  const [rows] = await conn.query(sql, values);  
  return rows;
}

module.exports = { query };