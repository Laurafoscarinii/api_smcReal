const { query } = require('./database');

const individuoModel = {
    async criarIndividuo(cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone) {
        const queryInsert = `
            INSERT INTO individuo (cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await query(queryInsert, [cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone]);
        return result.insertId; // Retorna o ID do novo indivíduo
    },

    async individuoPorCPF(cpf) {
        const individuo = await query('SELECT * FROM individuo WHERE cpf = ?', [cpf]);
        return individuo.length > 0 ? individuo[0] : null;
    },

    async atualizaIndividuo(cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone) {
        const atualizarIndividuo = `
            UPDATE individuo 
            SET nome = ?, sobrenome = ?, sexo = ?, dataNascimento = ?, rg = ?, nis = ?, etnia = ?, email = ?, cep = ?, estado = ?, cidade = ?, bairro = ?, complemento = ?, rua = ?, numero = ?, numeroTelefone = ?
            WHERE cpf = ?
        `;
        await query(atualizarIndividuo, [nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone, cpf]);
    },

    async listarIndividuos() {
        return await query('SELECT * FROM individuo');
    },

    async excluirIndividuo(cpf) {
        await query('DELETE FROM individuo WHERE cpf = ?', [cpf]);
    }
};


// Função para listar todos os indivíduos
exports.listarIndividuos = async () => {
    try {
      const queryString = 'SELECT * FROM individuo';  // Query para pegar todos os indivíduos
      const individuos = await db.query(queryString); // Chama a função query do arquivo de banco de dados
      return individuos; // Retorna os dados dos indivíduos
    } catch (error) {
      throw new Error('Erro ao listar indivíduos: ' + error.message);
    }
  };


module.exports = individuoModel;