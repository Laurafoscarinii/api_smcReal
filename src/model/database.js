const mysql = require('mysql2/promise');

let connection;

async function connect() {
  // Verifica se a conexão já existe e se está ativa
  if (!connection || connection.state === 'disconnected') {
    try {
      connection = await mysql.createConnection({
        host: '108.179.193.178',
        port: '3306',
        user: 'wayin756_smcuser',
        password: '2jqZrDY5NwCn5Aq8',
        database: 'wayin756_smcdb',
        connectTimeout: 10000,
      });
      console.log('Conexão com o banco de dados estabelecida');
    } catch (err) {
      console.error("Erro ao conectar ao banco de dados:", err.message);
      throw err; // Repassa o erro se a conexão falhar
    }
  }
  return connection;
}

async function query(sql, values = []) {
  try {
    const conn = await connect();
    const [rows] = await conn.query(sql, values);
    return rows;
  } catch (err) {
    console.error("Erro na consulta:", err.message);
    throw err; // Repassa o erro para o controller
  }
}

module.exports = { query };

