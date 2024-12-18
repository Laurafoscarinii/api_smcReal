// usuarioModel.js
const { query } = require('../model/database'); // Verifique o caminho correto



// Função de exclusão de usuário
exports.excluirUsuario = async (matricula) => {
  try {
    console.log('Excluindo usuário com matrícula:', matricula); // Log para verificar a matrícula recebida
    const result = await query('DELETE FROM usuario WHERE matricula = ?', [matricula]);
    console.log('Resultado da exclusão:', result); // Verifique o que é retornado
    return result;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};


exports.usuarioPeloCPF = async (cpf) => {
  const usuario = await query(
    `SELECT * FROM usuario WHERE cpf = ?`, [cpf]
  );

  return usuario.length > 0;
};

exports.criaNovoUsuario = async (nome, cpf, dataNascimento, email, senha, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone) => {
  const sql = `
    INSERT INTO usuario (
      nome, cpf, dataNascimento, email, senha, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [nome, cpf, dataNascimento, email, senha, cep, estado, cidade, bairro, complemento, rua, numero, numeroTelefone];
  
  const result = await query(sql, values);
  return result;
};


exports.atualizaUsuario = async (matricula, nome, cpf, dataNascimento, email, senha) => { // Remova 'endereco' daqui
  const atualizarUsuario = `
    UPDATE usuario 
    SET nome = ?, cpf = ?, dataNascimento = ?, email = ?, senha = ?
    WHERE matricula = ?
  `;
  await query(atualizarUsuario, [nome, cpf, dataNascimento, email, senha, matricula]); // Remova 'endereco' daqui
};


// Função para listar todos os usuários
exports.listarUsuarios = async () => {
  const sql = `SELECT * FROM usuario`;
  const result = await query(sql);
  return result;
};



// usuarioModel.js
exports.buscarUsuarioPorEmailECpf = async (email, cpf) => {
  try {
    // Realizando a consulta no banco de dados
    const usuario = await query(
      `SELECT * FROM usuario WHERE email = ? AND cpf = ?`, [email, cpf]
    );

    // Retorna o primeiro usuário encontrado, se existir
    return usuario.length > 0 ? usuario[0] : null;
  } catch (error) {
    console.error('Erro ao consultar usuário:', error);
    throw new Error('Erro ao buscar usuário no banco de dados');
  }
};
