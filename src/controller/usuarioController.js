// usuarioController.js
const usuarioModel = require('../model/usuarioModel.js');
const { setToken } = require('../util/token.js');


exports.criarUsuario = async (req, res) => {
  const {
    nome,
    cpf,
    dataNascimento,
    email,
    senha,
    cep,
    estado,
    cidade,
    bairro,
    complemento,
    rua,
    numero,
    numeroTelefone
  } = req.body;

  // Verifique se os campos obrigatórios estão presentes
  if (!nome || !cpf || !dataNascimento || !email || !senha || !cep || !estado || !cidade || !bairro || !complemento || !rua || !numero || !numeroTelefone) {
    return res.status(400).send('Dados incompletos');
  }

  // Verifica se o usuário já existe
  const usuarioPeloCPF = await usuarioModel.usuarioPeloCPF(cpf);
  if (usuarioPeloCPF) {
    return res.status(400).send('Usuário já cadastrado!');
  }

  // Criação do usuário com os dados recebidos
  const criaNovoUsuario = await usuarioModel.criaNovoUsuario(
    nome,
    cpf,
    dataNascimento,
    email,
    senha,
    cep,
    estado,
    cidade,
    bairro,
    complemento,
    rua,
    numero,
    numeroTelefone
  );

  // Gere um novo token para o usuário criado
  const token = await setToken({ id: criaNovoUsuario.matricula });

  return res.status(200).json({ message: 'Usuário cadastrado!', token });
};




// Função para editar um usuário
exports.editarUsuario = async (req, res) => {
  const { matricula } = req.params;
  const { nome, cpf, dataNascimento, email, senha } = req.body; // Remova 'endereco' daqui

  if (!nome || !cpf || !dataNascimento || !email || !senha) { // Remova 'endereco' da verificação
    return res.status(400).send('Dados incompletos');
  }

  try {
    await usuarioModel.atualizaUsuario(matricula, nome, cpf, dataNascimento, email, senha); // Remova 'endereco' daqui
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
};



exports.excluirUsuario = async (req, res) => {
  const { matricula } = req.params; // Obtém a matrícula da URL
  console.log('Matrícula recebida para exclusão:', matricula); // Log para verificar a matrícula

  try {
    const result = await usuarioModel.excluirUsuario(matricula); // Chama a função do modelo para excluir o usuário
    console.log('Resultado da exclusão:', result); // Log para verificar o resultado da operação

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return res.status(500).json({ message: 'Erro ao excluir usuário.', error: error.message });
  }
};


// Defina a função listarUsuarios corretamente
exports.listarUsuarios = async (req, res) => {
  try {
    // Chame a função do modelo que lista os usuários
    const usuarios = await usuarioModel.listarUsuarios();
    res.json(usuarios); // Retorne os usuários encontrados
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar Usuários.', error: error.message });
  }
};





// usuarioController.js
exports.buscarUsuarioPorEmailECpf = async (req, res) => {
  const { email, cpf } = req.body;

  if (!email || !cpf) {
    return res.status(400).send('Email e CPF são obrigatórios');
  }

  try {
    const usuario = await usuarioModel.buscarUsuarioPorEmailECpf(email, cpf);

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    // Retorna os dados do usuário com sucesso
    return res.status(200).json({ success: true, user: usuario });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error); // Log para depuração
    res.status(500).json({ message: 'Erro ao buscar usuário.', error: error.message });
  }
};

