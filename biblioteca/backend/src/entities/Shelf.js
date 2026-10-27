const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Shelf',
  tableName: 'shelves',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    codigo: { type: 'varchar', length: 80, nullable: false, unique: true },
    ubicacion: { type: 'varchar', length: 200, nullable: true },
    descripcion: { type: 'text', nullable: true }
  },
  relations: {
    books: {
      target: 'Book',
      type: 'one-to-many',
      inverseSide: 'shelf',
      cascade: ['soft-remove']
    }
  }
});
