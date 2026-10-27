const yup = require('yup');

const loginSchema = yup.object({
  username: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida')
});

module.exports = { loginSchema };
