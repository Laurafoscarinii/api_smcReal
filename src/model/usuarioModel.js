const { query } = require('./database');

exports.usuarioPeloCPF = async (cpf) => {
    const usuario = await query(
        `SELECT * FROM usuario WHERE cpf = ?`, [cpf]  // Passe o valor de 'cpf' como segundo parâmetro
    );

    return usuario.length > 0;
};

exports.criaNovoUsuario = async (nome, cpf, dataNascimento, endereco, email, senha) => {
    const novoUsuario = `
      INSERT INTO usuario (nome, cpf, dataNascimento, endereco_idendereco, email, senha) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    try {
      const result = await query(novoUsuario, [nome, cpf, dataNascimento, endereco, email, senha]); // Passe os valores aqui
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao cadastrar usuario: ' + error.message);
    }
};

// usuarioModel.js
exports.usuarioPorId = async (id) => {
  const usuario = await query('SELECT * FROM usuario WHERE id = ?', [id]);
  return usuario.length > 0 ? usuario[0] : null;
};

exports.atualizaUsuario = async (matricula, nome, cpf, dataNascimento, endereco, email, senha) => {
  const atualizarUsuario = `
    UPDATE usuario 
    SET nome = ?, cpf = ?, dataNascimento = ?, endereco_idendereco = ?, email = ?, senha = ?
    WHERE matricula = ?
  `;
  await query(atualizarUsuario, [nome, cpf, dataNascimento, endereco, email, senha, matricula]);
};


exports.listarUsuarios = async () => {
  return await query('SELECT * FROM usuario');
};

exports.excluirUsuario = async (id) => {
  await query('DELETE FROM usuario WHERE id = ?', [id]);
};