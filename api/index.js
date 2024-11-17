const express = require('express');  // Corrigido para 'express'
const cors = require ('cors');

// Resto do seu código...

const app = express();  // Use 'app' em vez de 'aplicativo'

// Configurações de middleware
app.use(cors());
app.use(express.json());
// app.use(authMiddleware); // Descomente se você estiver usando middleware de autenticação

const root = require('../src/routers/root');
app.use('/', root); // Certifique-se de que o arquivo 'root' exista e tenha a rota correta

// Configura o servidor para aceitar conexões de qualquer IP
app.listen(5000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 5000');
});


module.exports = app; // Exportação para Vercel

