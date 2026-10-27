const { DataSource } = require('typeorm');
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = require('./env');
const { AdminEntity, AuthorEntity, GenreEntity, SagaEntity, ShelfEntity, BookEntity, EventLogEntity } = require('../entities');

const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    AdminEntity,
    AuthorEntity,
    GenreEntity,
    SagaEntity,
    ShelfEntity,
    BookEntity,
    EventLogEntity
  ],
  migrations: [],
  subscribers: []
});

module.exports = { AppDataSource };
