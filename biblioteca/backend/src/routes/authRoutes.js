const express = require('express');
const { loginController } = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { loginSchema } = require('../validators/auth');

const router = express.Router();
router.post('/login', validate(loginSchema), loginController);

module.exports = router;
