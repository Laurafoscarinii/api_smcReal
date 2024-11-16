const db = require('./database');

async function testConnection() {
  try {
    const rows = await db.query('SELECT 1'); // Consulta simples para testar conexão
    console.log('Conexão funcionando:', rows);
  } catch (error) {
    console.error('Erro durante o teste de conexão:', error.message); // Detalhes do erro
    console.error('Stack Trace:', error.stack); // Detalhes da origem do erro
  }
}

testConnection();
