const individuoModel = require('../model/individuoModel');
const db = require('../model/database'); // Altere para o caminho correto de configuração

// Criar um novo indivíduo
exports.criarIndividuo = async (req, res) => {
    try {
        const {
          cpf, nome, sobrenome, sexo, dataNascimento, rg, nis,
          etnia, email, cep, estado, cidade, bairro,
          complemento, rua, numero, numeroTelefone
        } = req.body;
    
        // Verifica se todos os campos obrigatórios estão presentes
        if (!cpf || !nome || !sobrenome || !sexo || !dataNascimento || !rg || !nis ||
            !etnia || !email || !cep || !estado || !cidade || !bairro ||
            !complemento || !rua || !numero || !numeroTelefone) {
          return res.status(400).json({ message: "Por favor, preencha todos os campos obrigatórios." });
        }
    
        // Query SQL para inserir um novo indivíduo
        const sql = `
          INSERT INTO individuo (cpf, nome, sobrenome, sexo, dataNascimento, rg, nis,
          etnia, email, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        // Executa a query passando os valores
        await db.query(sql, [
          cpf, nome, sobrenome, sexo, dataNascimento, rg, nis,
          etnia, email, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone
        ]);
    
        res.status(201).json({ message: "Indivíduo cadastrado com sucesso." });
      } catch (error) {
        res.status(500).json({
          message: "Erro ao cadastrar indivíduo.",
          error: error.message,
        });
      }
};

// Atualizar um indivíduo
exports.atualizaIndividuo = async (req, res) => {
    const { cpf } = req.params;
    const { 
        nome, sobrenome, sexo, 
        dataNascimento, rg, nis, etnia, 
        email, cep, estado, cidade, 
        bairro, complemento, rua, numero, 
        numeroTelefone 
    } = req.body;

    try {
        await individuoModel.atualizaIndividuo(cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone);
        res.status(200).json({ message: 'Indivíduo atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar indivíduo.', error: error.message });
    }
};

// Excluir um indivíduo
exports.excluirIndividuo = async (req, res) => {
    const { cpf } = req.params;

    if (!cpf) {
        return res.status(400).send('CPF do indivíduo é necessário');
    }

    // Verifique se o indivíduo existe pelo CPF
    const individuoExistente = await individuoModel.individuoPorCPF(cpf);

    if (!individuoExistente) {
        return res.status(404).send('Indivíduo não encontrado');
    }

    // Exclua o indivíduo pelo CPF
    await individuoModel.excluirIndividuo(cpf);
    return res.status(200).json({ message: 'Indivíduo excluído com sucesso' });
};

// Listar todos os indivíduos
exports.listarIndividuos = async (req, res) => {
    const individuos = await individuoModel.listarIndividuos();
    return res.status(200).json(individuos);
};