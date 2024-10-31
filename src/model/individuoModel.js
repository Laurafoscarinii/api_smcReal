const { query } = require('./database');

exports.individuoPeloCPF = async (cpf) => {
    const result = await query(`SELECT * FROM individuo WHERE cpf = ?`, [cpf]);
    return result.length > 0;
};

exports.criaNovoIndividuo = async (cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco) => {
    const novoIndividuo = `
      INSERT INTO individuo (cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query(novoIndividuo, [cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco]);
    return result;
};
