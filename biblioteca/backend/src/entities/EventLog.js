const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'EventLog',
  tableName: 'event_logs',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    nivel: { type: 'varchar', length: 20, nullable: false },
    mensaje: { type: 'text', nullable: false },
    fecha: { type: 'datetime', nullable: false }
  }
});
