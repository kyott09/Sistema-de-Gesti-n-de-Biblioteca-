const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Genre',
  tableName: 'genres',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    nombre: { type: 'varchar', length: 100, unique: true, nullable: false }
  },
  relations: {
    books: {
      target: 'Book',
      type: 'one-to-many',
      inverseSide: 'genre',
      cascade: ['soft-remove']
    }
  }
});
