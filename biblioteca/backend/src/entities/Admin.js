const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Admin',
  tableName: 'admin',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    username: { type: 'varchar', length: 100, unique: true, nullable: false },
    password: { type: 'varchar', length: 255, nullable: false }
  }
});
