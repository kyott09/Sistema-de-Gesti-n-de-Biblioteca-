const mysql = require('mysql2/promise');
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = require('./env');

async function ensureDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  } finally {
    await connection.end();
  }
}

module.exports = { ensureDatabase };
