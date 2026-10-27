const app = require('./app');
const { AppDataSource } = require('./config/dataSource');
const { ensureDatabase } = require('./config/initDatabase');
const { PORT } = require('./config/env');
const { logger } = require('./utils/logger');

async function startServer() {
  try {
    await ensureDatabase();
    await AppDataSource.initialize();
    logger.info('Conexión a MySQL inicializada correctamente');
    app.listen(PORT, () => {
      logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('No se pudo iniciar el servidor. Verifique que MySQL esté iniciado en XAMPP.');
    logger.error(error.message);
    process.exit(1);
  }
}

startServer();
