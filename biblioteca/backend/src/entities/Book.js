const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Book',
  tableName: 'books',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    titulo: { type: 'varchar', length: 200, nullable: false },
    anioPublicacion: { type: 'int', nullable: false },
    isbn: { type: 'varchar', length: 50, nullable: true },
    descripcion: { type: 'text', nullable: true }
  },
  relations: {
    author: {
      target: 'Author',
      type: 'many-to-one',
      joinColumn: true,
      nullable: false,
      inverseSide: 'books'
    },
    genre: {
      target: 'Genre',
      type: 'many-to-one',
      joinColumn: true,
      nullable: false,
      inverseSide: 'books'
    },
    shelf: {
      target: 'Shelf',
      type: 'many-to-one',
      joinColumn: true,
      nullable: false,
      inverseSide: 'books'
    },
    saga: {
      target: 'Saga',
      type: 'many-to-one',
      joinColumn: true,
      nullable: true,
      inverseSide: 'books'
    }
  }
});
