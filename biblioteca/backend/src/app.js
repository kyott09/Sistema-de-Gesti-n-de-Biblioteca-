const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/booksRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const logRoutes = require('./routes/logRoutes');
const { authenticate } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const AppError = require('./utils/AppError');
const { AUTH, BOOKS, AUTHORS, GENRES, SAGAS, SHELVES, LOGS } = require('./constants/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(requestLogger);

app.use(AUTH, authRoutes);
app.use(BOOKS, authenticate, booksRoutes);
app.use('/api', authenticate, resourceRoutes);
app.use(LOGS, authenticate, logRoutes);

app.use((req, res, next) => {
  next(new AppError('Ruta no encontrada', 404));
});

app.use(errorHandler);

module.exports = app;
