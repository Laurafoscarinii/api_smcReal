const telefoneModel = require('../model/telefoneModel');

exports.criarTelefone = async (req, res) => {
    const { numero, tipo, individuo_cpf } = req.body;
    if (!numero || !tipo || !individuo_cpf) {
        return res.status(400).send('Dados incompletos');
    }

    const novoTelefone = await telefoneModel.criaNovoTelefone(numero, tipo, individuo_cpf);
    return res.status(201).json({ message: 'Telefone cadastrado com sucesso', telefone: novoTelefone });
};
