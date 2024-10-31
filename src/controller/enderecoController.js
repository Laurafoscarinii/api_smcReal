const enderecoModel = require('../model/enderecoModel.js');
const { setToken } = require('../util/token.js');

exports.criarEndereco = async (req, res) => {
  const { cep, estado, cidade, bairro, complemento, rua, numero } = req.body;
  if (!cep || !estado || !cidade || !bairro || !complemento || !rua || !numero) {
    return res.status(400).send('Dados incompletos');
  }

  const enderecoPeloNumero = await enderecoModel.enderecoPeloNumero(numero);
  if (enderecoPeloNumero) {
    return res.status(400).send('Endereço já cadastrado!');
  }

  const criaNovoEndereco = await enderecoModel.criaNovoEndereco(cep, estado, cidade, bairro, complemento, rua, numero);
  const token = await setToken(criaNovoEndereco);
  return res.status(200).json({ message: 'Endereço cadastrado!', token });
};
