const telefoneModel = require('../model/telefoneModel');

exports.cadastrarTelefone = async (req, res) => {
  const { numero, individuo_cpf, usuario_matricula, doador_cpf } = req.body;

  if (!numero || !individuo_cpf || !usuario_matricula || !doador_cpf) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  const telefoneExistente = await telefoneModel.telefonePeloNumero(numero);
  if (telefoneExistente) {
    return res.status(400).json({ message: 'Telefone já cadastrado!' });
  }

  const novoTelefoneId = await telefoneModel.criaNovoTelefone(numero, individuo_cpf, usuario_matricula, doador_cpf);
  return res.status(201).json({ message: 'Telefone cadastrado!', id: novoTelefoneId });
};
