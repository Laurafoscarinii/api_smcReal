const express = require('express');
const cors = require('cors');
const authMiddleware = require('./src/middleware/authMiddleware');



// Resto do seu código...


const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

const root = require('./src/routers/root');

app.use('/', root);

module.exports = app;
