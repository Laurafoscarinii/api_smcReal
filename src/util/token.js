const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN_KEY = process.env.TOKEN_KEY || 'SMC_TOKEN_KEY'; // Use uma chave secreta do ambiente ou uma chave padrão

const setToken = (usuario) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id: usuario.id }, TOKEN_KEY, { expiresIn: '30d' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            console.log("Token gerado:", token); // Verifique no console se o token está correto
            resolve(token);
        });
    });
};


module.exports = { setToken };