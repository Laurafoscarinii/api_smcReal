const { query } = require('./database');

exports.criaNovoTelefone = async (numero, tipo, individuo_cpf) => {
    const novoTelefone = `
      INSERT INTO telefone (numero, tipo, individuo_cpf)
      VALUES (?, ?, ?)
    `;
    const result = await query(novoTelefone, [numero, tipo, individuo_cpf]);
    return result;
};