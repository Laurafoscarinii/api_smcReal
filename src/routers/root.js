const express = require("express");
const usuarioController = require("../controller/usuarioController");
const enderecoController = require("../controller/enderecoController.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("<h1>Sistema de Monitoramento de Calamidade</h1>");
});

router.get("/sobre", (req, res) => {
  res.status(200).send({
    nome: "smc api",
    versao: "0.1.0",
    autor: "Laura e Natália",
  });
});


router.post("/usuarios", async (req, res) => {
  try {
    await usuarioController.criarUsuario(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar Usuário.', error: error.message });
  }
});

// Rota de endereço sem middleware de autenticação
router.post("/enderecos", async (req, res) => {
  try {
    await enderecoController.criarEndereco(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar endereço.', error: error.message });
  }
});

module.exports = router;
