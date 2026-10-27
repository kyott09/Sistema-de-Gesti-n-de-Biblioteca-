const { login } = require('../services/authService');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');

const loginController = async (req, res, next) => {
  try {
    const data = await login(req.body);
    return sendSuccess(res, data, 'Login exitoso', 200);
  } catch (error) {
    next(error instanceof AppError ? error : new AppError('Error de autenticación', 401));
  }
};

module.exports = { loginController };
