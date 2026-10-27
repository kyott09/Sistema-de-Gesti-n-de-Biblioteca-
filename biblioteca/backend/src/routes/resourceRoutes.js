const express = require('express');
const { createEntityController } = require('../controllers/entityController');
const validate = require('../middlewares/validate');
const { authorSchema, genreSchema, sagaSchema, shelfSchema } = require('../validators/resource');

const authors = createEntityController('Author', 'author');
const genres = createEntityController('Genre', 'genre');
const sagas = createEntityController('Saga', 'saga');
const shelves = createEntityController('Shelf', 'shelf');

const router = express.Router();

router.get('/authors', authors.getAll);
router.get('/authors/:id', authors.getById);
router.post('/authors', validate(authorSchema), authors.create);
router.put('/authors/:id', validate(authorSchema), authors.update);
router.delete('/authors/:id', authors.remove);

router.get('/genres', genres.getAll);
router.get('/genres/:id', genres.getById);
router.post('/genres', validate(genreSchema), genres.create);
router.put('/genres/:id', validate(genreSchema), genres.update);
router.delete('/genres/:id', genres.remove);

router.get('/sagas', sagas.getAll);
router.get('/sagas/:id', sagas.getById);
router.post('/sagas', validate(sagaSchema), sagas.create);
router.put('/sagas/:id', validate(sagaSchema), sagas.update);
router.delete('/sagas/:id', sagas.remove);

router.get('/shelves', shelves.getAll);
router.get('/shelves/:id', shelves.getById);
router.post('/shelves', validate(shelfSchema), shelves.create);
router.put('/shelves/:id', validate(shelfSchema), shelves.update);
router.delete('/shelves/:id', shelves.remove);

module.exports = router;
