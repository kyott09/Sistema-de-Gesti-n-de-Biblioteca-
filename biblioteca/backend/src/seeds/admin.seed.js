const bcrypt = require('bcrypt');
const { AppDataSource } = require('../config/dataSource');
const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../config/env');
const { ensureDatabase } = require('../config/initDatabase');

async function upsertOne(repo, criteria, payload, label) {
  const existing = await repo.findOne({ where: criteria });
  if (existing) {
    return existing;
  }
  const created = await repo.save(payload);
  console.log(`${label} creado correctamente`);
  return created;
}

async function seedCatalog() {
  const authorRepo = AppDataSource.getRepository('Author');
  const genreRepo = AppDataSource.getRepository('Genre');
  const sagaRepo = AppDataSource.getRepository('Saga');
  const shelfRepo = AppDataSource.getRepository('Shelf');

  await upsertOne(authorRepo, { nombre: 'Gabriel García Márquez' }, { nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana' }, 'Autor');
  await upsertOne(authorRepo, { nombre: 'J.K. Rowling' }, { nombre: 'J.K. Rowling', nacionalidad: 'Británica' }, 'Autor');
  await upsertOne(authorRepo, { nombre: 'Julio Cortázar' }, { nombre: 'Julio Cortázar', nacionalidad: 'Argentina' }, 'Autor');

  await upsertOne(genreRepo, { nombre: 'Novela' }, { nombre: 'Novela' }, 'Género');
  await upsertOne(genreRepo, { nombre: 'Fantasía' }, { nombre: 'Fantasía' }, 'Género');
  await upsertOne(genreRepo, { nombre: 'Ciencia ficción' }, { nombre: 'Ciencia ficción' }, 'Género');

  await upsertOne(sagaRepo, { nombre: 'Saga clásica' }, { nombre: 'Saga clásica', descripcion: 'Colección clásica de literatura universal' }, 'Saga');
  await upsertOne(sagaRepo, { nombre: 'Saga contemporánea' }, { nombre: 'Saga contemporánea', descripcion: 'Obras contemporáneas de la biblioteca' }, 'Saga');

  await upsertOne(shelfRepo, { codigo: 'A1' }, { codigo: 'A1', ubicacion: 'Primer piso', descripcion: 'Ficción clásica' }, 'Estante');
  await upsertOne(shelfRepo, { codigo: 'A2' }, { codigo: 'A2', ubicacion: 'Primer piso', descripcion: 'Fantasía y literatura juvenil' }, 'Estante');
  await upsertOne(shelfRepo, { codigo: 'B1' }, { codigo: 'B1', ubicacion: 'Segundo piso', descripcion: 'Ciencia ficción' }, 'Estante');
}

async function seedAdmin() {
  await ensureDatabase();
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository('Admin');
  const existing = await repo.findOne({ where: { username: ADMIN_USERNAME } });

  if (!existing) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await repo.save({ username: ADMIN_USERNAME, password: passwordHash });
    console.log('Administrador creado correctamente');
  } else {
    console.log('El administrador ya existe');
  }

  await seedCatalog();
  await AppDataSource.destroy();
}

seedAdmin().catch((error) => {
  console.error('Error al crear el administrador o sembrar datos:', error.message);
  process.exit(1);
});
