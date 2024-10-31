const individuoModel = require('../model/individuoModel');

exports.criarIndividuo = async (req, res) => {
    const { cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco } = req.body;
    if (!cpf || !nome || !sobrenome || !sexo || !dataNascimento || !rg || !nis || !etnia || !email || !endereco_idendereco) {
        return res.status(400).send('Dados incompletos');
    }

    const individuoExistente = await individuoModel.individuoPeloCPF(cpf);
    if (individuoExistente) {
        return res.status(409).send('Indivíduo já cadastrado');
    }

    const novoIndividuo = await individuoModel.criaNovoIndividuo(cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco);
    return res.status(201).json({ message: 'Indivíduo cadastrado com sucesso', individuo: novoIndividuo });
};
