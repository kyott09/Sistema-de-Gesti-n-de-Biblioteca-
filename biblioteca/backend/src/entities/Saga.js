const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Saga',
  tableName: 'sagas',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    nombre: { type: 'varchar', length: 150, nullable: false },
    descripcion: { type: 'text', nullable: true }
  },
  relations: {
    books: {
      target: 'Book',
      type: 'one-to-many',
      inverseSide: 'saga',
      cascade: ['soft-remove']
    }
  }
});
