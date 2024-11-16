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
  const result = await query(novoEndereco, [cep, estado, cidade, bairro, complemento, rua, numero]);
  return result.insertId; // Isso deve retornar o ID do novo endereço
};




exports.atualizaEndereco = async (idendereco, cep, estado, cidade, bairro, complemento, rua, numero) => {
  const atualizarEndereco = `
    UPDATE endereco 
    SET cep = ?, estado = ?, cidade = ?, bairro = ?, complemento = ?, rua = ?, numero = ?
    WHERE idendereco = ?
  `;
  
  await query(atualizarEndereco, [cep, estado, cidade, bairro, complemento, rua, numero, idendereco]);
};



exports.enderecoPorId = async (idendereco) => {
  const endereco = await query('SELECT * FROM endereco WHERE idendereco = ?', [idendereco]);
  return endereco.length > 0 ? endereco[0] : null;
};


exports.excluirEndereco = async (idendereco) => {
  await query('DELETE FROM endereco WHERE idendereco = ?', [idendereco]);
};