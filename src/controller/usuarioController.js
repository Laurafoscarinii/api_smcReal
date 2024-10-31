const usuarioModel = require('../model/usuarioModel.js');
const enderecoModel = require('../model/enderecoModel.js'); // Importe o enderecoModel
const { setToken } = require('../util/token.js');


exports.criarUsuario = async (req, res) => {
  const { nome, cpf, dataNascimento, endereco, email, senha } = req.body;

  // Checar se todos os dados necessários estão presentes
  if (!nome || !cpf || !dataNascimento || !endereco || !email || !senha) {
    return res.status(400).send('Dados incompletos');
  }

  // Verifique se o usuário já existe pelo CPF
  const usuarioPeloCPF = await usuarioModel.usuarioPeloCPF(cpf);

  if (usuarioPeloCPF) {
    return res.status(400).send('Usuário já cadastrado!');
  }

  // Crie o novo usuário
  const criaNovoUsuario = await usuarioModel.criaNovoUsuario(nome, cpf, dataNascimento, endereco, email, senha);

  // Gere um novo token para o usuário criado usando o ID
  const token = await setToken(criaNovoUsuario);
  return res.status(200).json({ message: 'Usuário cadastrado!', token });
};