const { AppDataSource } = require('../config/dataSource');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');

const getBooks = async (req, res) => {
  const { genreId, authorId, year } = req.query;
  const query = AppDataSource.getRepository('Book').createQueryBuilder('book')
    .leftJoinAndSelect('book.author', 'author')
    .leftJoinAndSelect('book.genre', 'genre')
    .leftJoinAndSelect('book.shelf', 'shelf')
    .leftJoinAndSelect('book.saga', 'saga');

  if (genreId) query.andWhere('genre.id = :genreId', { genreId: Number(genreId) });
  if (authorId) query.andWhere('author.id = :authorId', { authorId: Number(authorId) });
  if (year) query.andWhere('book.anioPublicacion = :year', { year: Number(year) });

  const books = await query.orderBy('book.id', 'DESC').getMany();
  return sendSuccess(res, books, 'Libros obtenidos', 200);
};

const getBookById = async (req, res, next) => {
  try {
    const book = await AppDataSource.getRepository('Book').findOne({
      where: { id: Number(req.params.id) },
      relations: {
        author: true,
        genre: true,
        shelf: true,
        saga: true
      }
    });

    if (!book) {
      throw new AppError('Libro no encontrado', 404);
    }

    return sendSuccess(res, book, 'Libro encontrado', 200);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const { titulo, anioPublicacion, isbn, descripcion, authorId, genreId, shelfId, sagaId } = req.body;
    const repo = AppDataSource.getRepository('Book');
    const book = repo.create({
      titulo,
      anioPublicacion: Number(anioPublicacion),
      isbn: isbn || null,
      descripcion: descripcion || null,
      author: { id: Number(authorId) },
      genre: { id: Number(genreId) },
      shelf: { id: Number(shelfId) },
      saga: sagaId ? { id: Number(sagaId) } : null
    });

    const saved = await repo.save(book);
    return sendSuccess(res, saved, 'Libro creado correctamente', 201);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const repo = AppDataSource.getRepository('Book');
    const existing = await repo.findOne({ where: { id } });

    if (!existing) {
      throw new AppError('Libro no encontrado', 404);
    }

    const { titulo, anioPublicacion, isbn, descripcion, authorId, genreId, shelfId, sagaId } = req.body;
    Object.assign(existing, {
      titulo,
      anioPublicacion: Number(anioPublicacion),
      isbn: isbn || null,
      descripcion: descripcion || null,
      author: { id: Number(authorId) },
      genre: { id: Number(genreId) },
      shelf: { id: Number(shelfId) },
      saga: sagaId ? { id: Number(sagaId) } : null
    });

    const updated = await repo.save(existing);
    return sendSuccess(res, updated, 'Libro actualizado correctamente', 200);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const repo = AppDataSource.getRepository('Book');
    const book = await repo.findOne({ where: { id } });
    if (!book) throw new AppError('Libro no encontrado', 404);
    await repo.remove(book);
    return sendSuccess(res, null, 'Libro eliminado correctamente', 200);
  } catch (error) {
    next(error);
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
