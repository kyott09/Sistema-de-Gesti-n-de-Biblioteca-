require('dotenv').config();

module.exports = {
  PORT: Number(process.env.PORT || 3000),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT || 3306),
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'biblioteca_db',
  JWT_SECRET: process.env.JWT_SECRET || 'cambiar_este_secreto',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123'
};
