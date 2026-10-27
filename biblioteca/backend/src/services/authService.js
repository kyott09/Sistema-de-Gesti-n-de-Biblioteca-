const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/dataSource');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const AppError = require('../utils/AppError');
const { logger } = require('../utils/logger');

const login = async ({ username, password }) => {
  const adminRepo = AppDataSource.getRepository('Admin');
  const admin = await adminRepo.findOne({ where: { username } });

  if (!admin) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  logger.info(`Login exitoso para ${username}`);
  return { token, admin: { id: admin.id, username: admin.username } };
};

module.exports = { login };
