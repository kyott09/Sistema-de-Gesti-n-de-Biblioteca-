const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  const errors = err.errors || null;

  logger.error(`${req.method} ${req.originalUrl} - ${statusCode} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

module.exports = errorHandler;
