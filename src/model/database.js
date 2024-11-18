const mysql = require('mysql2/promise');

let connection;

// Função para conectar ao banco de dados
async function connect() {
  if (!connection || connection.connection._sock.destroyed) {  // Verifica se a conexão foi fechada
    console.log('Reiniciando conexão com o banco...');
    connection = await mysql.createConnection({
      host: '108.179.193.178',
      port: '3306',
      user: 'wayin756_smcuser',
      password: '2jqZrDY5NwCn5Aq8',
      database: 'wayin756_smcdb',
      connectTimeout: 10000,
    });
    console.log('Conexão com o banco de dados estabelecida');
  }
  return connection;
}

// Função para manter a conexão aberta
async function keepConnectionAlive() {
  try {
    const conn = await connect();
    await conn.ping();  // Envia um comando para manter a conexão viva
    console.log('Conexão com o banco de dados está ativa');
  } catch (err) {
    console.error("Erro ao manter conexão viva:", err.message);
  }
}

// Chamada periódica para manter a conexão viva
setInterval(keepConnectionAlive, 60000);  // A cada 60 segundos

// Função para executar a consulta
async function query(sql, values = []) {
  try {
    const conn = await connect();
    const [rows] = await conn.query(sql, values);
    return rows;
  } catch (err) {
    console.error("Erro na consulta:", err.message);
    throw err;
  }
}

module.exports = { query };
