const express = require("express");
const usuarioController = require("../controller/usuarioController");
const enderecoController = require("../controller/enderecoController");
const individuoController = require("../controller/individuoController");
const telefoneController = require("../controller/telefoneController");



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

// Rotas de Usuário
router.post("/usuarios", async (req, res) => {
  try {
    await usuarioController.criarUsuario(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar Usuário.', error: error.message });
  }
});

router.put("/usuarios/:matricula", async (req, res) => {
  try {
    await usuarioController.editarUsuario(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
});

router.delete("/usuarios/:id", async (req, res) => {
  try {
    await usuarioController.excluirUsuario(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir Usuário.', error: error.message });
  }
});

router.get("/usuarios", async (req, res) => {
  try {
    await usuarioController.listarUsuarios(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar Usuários.', error: error.message });
  }
});

// Rotas de Endereço
router.post("/enderecos", async (req, res) => {
  try {
    await enderecoController.criarEndereco(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar endereço.', error: error.message });
  }
});


// router.js
router.put("/enderecos/:id", async (req, res) => {
  try {
    await enderecoController.editarEndereco(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar endereço.', error: error.message });
  }
});




router.delete("/enderecos/:id", async (req, res) => {
  try {
    await enderecoController.excluirEndereco(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir endereço.', error: error.message });
  }
});

// Rotas de Indivíduo
router.post("/individuos", async (req, res) => {
  try {
    await individuoController.criarIndividuo(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar indivíduo.', error: error.message });
  }
});

router.put("/individuos/:cpf", async (req, res) => {
  try {
    await individuoController.atualizaIndividuo(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar indivíduo.', error: error.message });
  }
});


router.delete("/individuos/:id", async (req, res) => {
  try {
    await individuoController.excluirIndividuo(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir indivíduo.', error: error.message });
  }
});

router.get("/individuos", async (req, res) => {
  try {
    await individuoController.listarIndividuos(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar indivíduos.', error: error.message });
  }
});

// Rota de Telefone
router.post("/telefones", async (req, res) => {
  try {
    await telefoneController.cadastrarTelefone(req, res); // Certifique-se de que está chamando a função correta
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar telefone.', error: error.message });
  }
});

module.exports = router;
