const express = require('express');
const authRoutes = require('./authRoutes');
const booksRoutes = require('./booksRoutes');
const resourceRoutes = require('./resourceRoutes');
const logRoutes = require('./logRoutes');
const { AUTH, BOOKS, AUTHORS, GENRES, SAGAS, SHELVES, LOGS } = require('../constants/routes');

const router = express.Router();
router.use(AUTH, authRoutes);
router.use(BOOKS, booksRoutes);
router.use(AUTHORS, resourceRoutes);
router.use(GENRES, resourceRoutes);
router.use(SAGAS, resourceRoutes);
router.use(SHELVES, resourceRoutes);
router.use(LOGS, logRoutes);

module.exports = router;
