const yup = require('yup');

const idSchema = yup.object({
  id: yup.number().transform((value, original) => (original === '' ? undefined : value)).required('El id es requerido')
});

const authorSchema = yup.object({
  nombre: yup.string().required('El nombre es requerido').min(2, 'Debe tener al menos 2 caracteres'),
  nacionalidad: yup.string().nullable()
});

const genreSchema = yup.object({
  nombre: yup.string().required('El nombre es requerido').min(2, 'Debe tener al menos 2 caracteres')
});

const sagaSchema = yup.object({
  nombre: yup.string().required('El nombre es requerido').min(2, 'Debe tener al menos 2 caracteres'),
  descripcion: yup.string().nullable()
});

const shelfSchema = yup.object({
  codigo: yup.string().required('El código es requerido').min(2, 'Debe tener al menos 2 caracteres'),
  ubicacion: yup.string().nullable(),
  descripcion: yup.string().nullable()
});

const bookSchema = yup.object({
  titulo: yup.string().required('El título es requerido'),
  anioPublicacion: yup.number().required('El año es requerido').min(0, 'El año no puede ser negativo'),
  isbn: yup.string().nullable(),
  descripcion: yup.string().nullable(),
  authorId: yup.number().required('El autor es requerido'),
  genreId: yup.number().required('El género es requerido'),
  shelfId: yup.number().required('El estante es requerido'),
  sagaId: yup.number().nullable()
});

module.exports = { idSchema, authorSchema, genreSchema, sagaSchema, shelfSchema, bookSchema };
