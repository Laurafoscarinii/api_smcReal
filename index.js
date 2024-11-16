const express = require('express');
const cors = require('cors');
//const authMiddleware = require('./src/middleware/authMiddleware');

// Resto do seu código...

const app = express();

// Configurações de middleware
app.use(cors());
app.use(express.json());
//app.use(authMiddleware);

const root = require('./src/routers/root');
app.use('/', root);

// Configurar o servidor para aceitar conexões de qualquer IP
app.listen(5000, '0.0.0.0', () => {  // Alteração: '0.0.0.0' para aceitar qualquer IP da rede local
  console.log('Servidor rodando na porta 5000');
});

module.exports = app;