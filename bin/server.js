const http = require('http');
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const app = require("../index");

app.use((req, res, next) =>{
    next();
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});