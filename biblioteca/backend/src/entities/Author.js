const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Author',
  tableName: 'authors',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    nombre: { type: 'varchar', length: 150, nullable: false },
    nacionalidad: { type: 'varchar', length: 150, nullable: true }
  },
  relations: {
    books: {
      target: 'Book',
      type: 'one-to-many',
      inverseSide: 'author',
      cascade: ['soft-remove']
    }
  }
});
