// database.js
const mysql = require('mysql2/promise');



let connection;

async function connect() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: '10.0.1.142',
      port: '3306',
      user: 'laura',
      password: 'laura',
      database: 'mydb',
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

module.exports = { query }; // Verifique se está exportando corretamente
