const express = require ("express");
const usuarioController = require("../controller/usuarioController");
const enderecoController = require("../controller/enderecoController");
const individuoController = require("../controller/individuoController");
const telefoneController = require("../controller/telefoneController");




const router = express.Router();

// Rota de Home
router.get("/", (req, res) => {
  res.status(200).send("<h1>Sistema de Monitoramento de Calamidade</h1>");
});

// Rota Sobre
router.get("/sobre", (req, res) => {
  res.status(200).send({
    nome: "SMC API",
    versao: "0.1.0",
    autor: "Laura e Natália",
  });
});

// --------------------------
// Rotas de Usuário
router.post('/usuarios', async (req, res) => {
  try {
    await usuarioController.criarUsuario(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
  }
});

router.put("/usuarios/:matricula", async (req, res) => {
  try {
    await usuarioController.editarUsuario(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
});

router.delete("/usuarios/:matricula", async (req, res) => {
  try {
    await usuarioController.excluirUsuario(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir Usuário.', error: error.message });
  }
});
 
// Corrigir a chamada para a função listarUsuarios na rota
router.get("/usuarios", async (req, res) => {
  try {
    await usuarioController.listarUsuarios(req, res); // Certifique-se de que essa função está sendo chamada corretamente
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar Usuários.', error: error.message });
  }
});



// --------------------------
// Rotas de Endereço
router.post("/enderecos", async (req, res) => {
  try {
    await enderecoController.criarEndereco(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar endereço.', error: error.message });
  }
});

router.put("/enderecos/:id", async (req, res) => {
  try {
    await enderecoController.editarEndereco(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar endereço.', error: error.message });
  }
});

router.delete("/enderecos/:idendereco", async (req, res) => {
  try {
    await enderecoController.excluirEndereco(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir endereço.', error: error.message });
  }
});

// --------------------------
// Rotas de Indivíduo
// Exemplo de como deve estar sua rota
router.post("/individuos", async (req, res) => {
  try {
    await individuoController.criarIndividuo(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar indivíduo.', error: error.message });
  }
});



router.delete("/individuos/:cpf", async (req, res) => {
  try {
      await individuoController.excluirIndividuo(req, res);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir indivíduo.', error: error.message });
  }
});


// Rota para listar indivíduos
router.get("/individuos", async (req, res) => {
  try {
    await individuoController.listarIndividuos(req, res); // Chama a função do controller
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar indivíduos.', error: error.message });
  }
});

// --------------------------
// Rotas de Telefone
router.post("/telefones", async (req, res) => {
  try {
    await telefoneController.cadastrarTelefone(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar telefone.', error: error.message });
  }
});

router.put("/telefones/:cpf", async (req, res) => {
  try {
    await telefoneController.atualizarTelefone(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar telefone.', error: error.message });
  }
});

router.delete("/telefones/:cpf", async (req, res) => {
  try {
    await telefoneController.excluirTelefone(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir telefone.', error: error.message });
  }
});




// Definindo a rota para '/usuarios'
router.get('/usuarios', (req, res) => {
  res.json({ message: 'Rota de usuários funcionando' });
});



module.exports = router;