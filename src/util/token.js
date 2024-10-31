const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN_KEY = 'SMC_TOKEN_KEY'

const checkToken = async (token, id) => {
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    
    const idNum = Number(id);
    if (decoded.id !== idNum) {
      return { auth: false, message: 'Token inválido, ID do usuário não correspondente.' };
    }
    
    return { auth: true, message: 'Token válido.' };
  } catch (erro) {
    return { auth: false, message: 'Token inválido.' };
  }
};

const setToken = async (id) => {
  if (id <= 0) {
    return { auth: false, message: 'ID inválido.' };
  }

  const token = jwt.sign({ id }, TOKEN_KEY, { expiresIn: '30d' });
  return { auth: true, token };
};

module.exports = {
  checkToken,
  setToken,
};
