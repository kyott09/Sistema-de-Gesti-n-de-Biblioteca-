const winston = require('winston');
const fs = require('fs');
const path = require('path');
const LOG_LEVELS = require('../constants/logLevels');

const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}] ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, 'app.log') })
  ]
});

async function saveEventToDb(level, message) {
  try {
    const { AppDataSource } = require('../config/dataSource');
    if (AppDataSource.isInitialized) {
      await AppDataSource.manager.insert('EventLog', {
        nivel: level,
        mensaje: message,
        fecha: new Date()
      });
    }
  } catch (error) {
    logger.warn(`No se pudo guardar el log en base de datos: ${error.message}`);
  }
}

async function logEvent(level, message) {
  logger.log(level, message);
  if (Object.values(LOG_LEVELS).includes(level)) {
    await saveEventToDb(level, message);
  }
}

module.exports = { logger, logEvent };
