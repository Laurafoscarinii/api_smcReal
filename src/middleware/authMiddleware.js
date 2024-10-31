const { checkToken } = require('../util/token');

/**module.exports = async function (req, res, next) {
  if (req.originalUrl !== '/usuarios' && req.originalUrl !== '/endereco' && req.originalUrl !== '/sobre') {
  if (!req.header('token') || !req.header('idUsuario') || req.header('idEndereco')) {
    return res.status(400).json({ auth: false, message: 'Token ou ID do usuário e/ou endereço ausente.' });
  }
    const { auth, message } = await checkToken(req.header('token'), req.header('idUsuario'), req.header('idEndereco'));

    if (!auth) {
      return res.status(401).json({ auth, message });
    }
  }

  next();
};**/
const jwt = require('jsonwebtoken');
const TOKEN_KEY = 'SMC_TOKEN_KEY';

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ auth: false, message: 'Token ausente.' });
  }

  jwt.verify(token, TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ auth: false, message: 'Token inválido.' });
    }
    req.userId = decoded.id; // Armazena o ID do usuário decodificado
    next();
  });
};


/**module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  const { id, endereco } = req.body;

  // Exceção para a rota de criação de endereço
  if (req.path === '/enderecos') {
    return next();
  }

  if (!token || !id || !endereco) {
    return res.status(401).json({
      auth: false,
      message: 'Token ou ID do usuário e/ou endereço ausente.'
    });
  }


  next();
};
**/
