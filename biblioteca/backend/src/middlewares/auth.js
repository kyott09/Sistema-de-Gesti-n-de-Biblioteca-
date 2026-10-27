const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { JWT_SECRET } = require('../config/env');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Token requerido', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError('Token inválido o expirado', 401));
  }
};

module.exports = { authenticate };
