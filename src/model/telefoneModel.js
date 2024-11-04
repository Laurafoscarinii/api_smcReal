const { query } = require('./database'); // Importa a função de consulta do seu módulo de banco de dados

const telefoneModel = {
  async telefonePeloNumero(numero) {
    const telefoneQuery = `SELECT * FROM telefone WHERE numero = ?`;
    const [result] = await query(telefoneQuery, [numero]);
    return result.length ? result[0] : null; // Retorna o telefone se existir
  },

  async criaNovoTelefone(numero, individuo_cpf, usuario_matricula, doador_cpf) {
    const novoTelefone = `
      INSERT INTO telefone (numero, individuo_cpf, usuario_matricula, doador_cpf)
      VALUES (?, ?, ?, ?)
    `;
    const result = await query(novoTelefone, [numero, individuo_cpf, usuario_matricula, doador_cpf]);
    return result.insertId; // Retorna o ID do novo telefone
  }
};

module.exports = telefoneModel;
