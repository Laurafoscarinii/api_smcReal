const { query } = require('./database');

exports.enderecoPeloNumero = async (numero) => {
  const endereco = await query(
    `SELECT * FROM endereco WHERE numero = ?`, [numero]
  );
  return endereco.length > 0 ? endereco : null;
};

exports.criaNovoEndereco = async (cep, estado, cidade, bairro, complemento, rua, numero) => {
  const novoEndereco = `
  INSERT INTO endereco (cep, estado, cidade, bairro, complemento, rua, numero) 
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

  try {
    const result = await query(novoEndereco, [cep, estado, cidade, bairro, complemento, rua, numero]);
    return result.insertId;
  } catch (error) {
    throw new Error('Erro ao cadastrar endereço: ' + error.message);
  }
};
