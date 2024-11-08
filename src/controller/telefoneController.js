const telefoneModel = require('../model/telefoneModel');

exports.cadastrarTelefone = async (req, res) => {
  const { numero, individuo_cpf } = req.body;

  // Verifica se os dados obrigatórios foram fornecidos
  if (!numero || !individuo_cpf) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  try {
    // Verifica se o telefone já existe
    const telefoneExistente = await telefoneModel.telefonePeloNumero(numero);
    if (telefoneExistente) {
      return res.status(400).json({ message: 'Telefone já cadastrado!' });
    }

    // Cria um novo telefone e retorna o ID
    const novoTelefoneId = await telefoneModel.criaNovoTelefone(numero, individuo_cpf);
    return res.status(201).json({ message: 'Telefone cadastrado!', id: novoTelefoneId });
  } catch (error) {
    console.error(error); // Para depuração
    return res.status(500).json({ message: 'Erro ao cadastrar telefone.', error: error.message });
  }
};









exports.atualizarTelefone = async (req, res) => {
  const { numero } = req.body; // Novo número de telefone
  const { cpf } = req.params; // CPF da URL

  // Verifica se os dados obrigatórios foram fornecidos
  if (!numero) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  try {
    // Atualiza o telefone
    const resultado = await telefoneModel.atualizaTelefonePorCpf(cpf, numero);
    if (resultado) {
      return res.status(200).json({ message: 'Telefone atualizado com sucesso!' });
    } else {
      return res.status(404).json({ message: 'Telefone não encontrado ou CPF inválido.' });
    }
  } catch (error) {
    console.error(error); // Para depuração
    return res.status(500).json({ message: 'Erro ao atualizar telefone.', error: error.message });
  }
};

exports.excluirTelefone = async (req, res) => {
  const { cpf } = req.params; // CPF da URL

  try {
    // Exclui o telefone
    const resultado = await telefoneModel.excluirTelefonePorCpf(cpf);
    if (resultado) {
      return res.status(200).json({ message: 'Telefone excluído com sucesso!' });
    } else {
      return res.status(404).json({ message: 'Telefone não encontrado ou CPF inválido.' });
    }
  } catch (error) {
    console.error(error); // Para depuração
    return res.status(500).json({ message: 'Erro ao excluir telefone.', error: error.message });
  }
};