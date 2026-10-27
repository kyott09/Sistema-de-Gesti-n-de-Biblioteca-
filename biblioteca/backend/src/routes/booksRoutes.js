const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const validate = require('../middlewares/validate');
const { bookSchema } = require('../validators/resource');

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validate(bookSchema), createBook);
router.put('/:id', validate(bookSchema), updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
