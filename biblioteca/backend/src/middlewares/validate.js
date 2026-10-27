const AppError = require('../utils/AppError');

const validate = (schema) => async (req, res, next) => {
  try {
    const data = { ...req.body, ...req.params, ...req.query };
    const validated = await schema.validate(data, { abortEarly: false });
    req.validatedBody = validated;
    req.body = { ...req.body, ...validated };
    next();
  } catch (error) {
    const errors = error.inner ? error.inner.reduce((acc, err) => {
      acc[err.path] = err.message;
      return acc;
    }, {}) : { general: error.message };
    next(new AppError('Datos inválidos', 400, errors));
  }
};

module.exports = validate;
