const individuoModel = require('../model/individuoModel');

// No controlador (individuoController.js)
exports.criarIndividuo = async (req, res) => {
    const { cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco } = req.body;

    // Verificação de campos obrigatórios
    if (!cpf || !nome || !sobrenome || !sexo || !dataNascimento || !rg || !nis || !etnia || !email || !endereco_idendereco) {
        return res.status(400).json({ message: 'Dados incompletos' });
    }

    try {
        const id = await individuoModel.criaNovoIndividuo(cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco);
        return res.status(201).json({ message: 'Indivíduo cadastrado com sucesso', id });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar indivíduo.', error: error.message });
    }
};



exports.atualizaIndividuo = async (req, res) => {
    const { cpf } = req.params; // Mude de req.params para obter o cpf
    const { nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco } = req.body;
  
    try {
      await individuoModel.atualizaIndividuo(cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco);
      res.status(200).json({ message: 'Indivíduo atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar indivíduo.', error: error.message });
    }
  };
  





  exports.excluirIndividuo = async (req, res) => {
    const { id } = req.params; // Espera que o ID do indivíduo seja passado na URL
  
    if (!id) {
      return res.status(400).send('ID do indivíduo é necessário');
    }
  
    const individuoExistente = await individuoModel.individuoPorId(id);
  
    if (!individuoExistente) {
      return res.status(404).send('Indivíduo não encontrado');
    }
  
    await individuoModel.excluirIndividuo(id); // Você precisa implementar essa função no modelo.
    return res.status(200).json({ message: 'Indivíduo excluído com sucesso' });
  };

  
  exports.listarIndividuos = async (req, res) => {
    const individuos = await individuoModel.listarIndividuos(); // Você precisa implementar essa função no modelo.
    return res.status(200).json(individuos);
  };
  