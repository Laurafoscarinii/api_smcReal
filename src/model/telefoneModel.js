const { query } = require('./database'); // Importa a função de consulta do seu módulo de banco de dados

const telefoneModel = {
  async telefonePeloNumero(numero) {
    const telefoneQuery = `SELECT * FROM telefone WHERE numero = ?`;
    const result = await query(telefoneQuery, [numero]);
    console.log('Resultado da consulta pelo número:', result); // Adiciona log para depuração
    return result.length ? result[0] : null; // Retorna o telefone se existir
  },

  async criaNovoTelefone(numero, individuo_cpf) {
    const novoTelefoneQuery = `
      INSERT INTO telefone (numero, individuo_cpf)
      VALUES (?, ?)
    `;
    const result = await query(novoTelefoneQuery, [numero, individuo_cpf]);
    return result.insertId; // Retorna o ID do novo telefone
  },
  

  async atualizaTelefonePorCpf(cpf, numero) {
    const updateQuery = `UPDATE telefone SET numero = ? WHERE individuo_cpf = ?`;
    const result = await query(updateQuery, [numero, cpf]);
    return result.affectedRows > 0; // Retorna verdadeiro se alguma linha foi afetada
  },

  async excluirTelefonePorCpf(cpf) {
    const deleteQuery = `DELETE FROM telefone WHERE individuo_cpf = ?`;
    const result = await query(deleteQuery, [cpf]);
    return result.affectedRows > 0; // Retorna verdadeiro se alguma linha foi afetada
  }
};

module.exports = telefoneModel;







