const { AppDataSource } = require('../config/dataSource');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');

const createEntityController = (entityName, dependencyKey) => ({
  getAll: async (req, res) => {
    const repo = AppDataSource.getRepository(entityName);
    const items = await repo.find({ order: { id: 'DESC' } });
    return sendSuccess(res, items, 'Listado obtenido', 200);
  },
  create: async (req, res, next) => {
    try {
      const repo = AppDataSource.getRepository(entityName);
      const created = await repo.save(req.body);
      return sendSuccess(res, created, 'Recurso creado correctamente', 201);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const repo = AppDataSource.getRepository(entityName);
      const item = await repo.findOne({ where: { id: Number(req.params.id) } });
      if (!item) throw new AppError('Recurso no encontrado', 404);
      return sendSuccess(res, item, 'Recurso encontrado', 200);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const repo = AppDataSource.getRepository(entityName);
      const item = await repo.findOne({ where: { id: Number(req.params.id) } });
      if (!item) throw new AppError('Recurso no encontrado', 404);
      Object.assign(item, req.body);
      const saved = await repo.save(item);
      return sendSuccess(res, saved, 'Recurso actualizado correctamente', 200);
    } catch (error) {
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const repo = AppDataSource.getRepository(entityName);
      const item = await repo.findOne({ where: { id: Number(req.params.id) } });
      if (!item) throw new AppError('Recurso no encontrado', 404);

      if (dependencyKey) {
        const dependencyRepo = AppDataSource.getRepository('Book');
        const count = await dependencyRepo.count({ where: { [dependencyKey]: { id: Number(req.params.id) } } });
        if (count > 0) {
          throw new AppError('No se puede eliminar este registro porque tiene libros asociados.', 409);
        }
      }

      await repo.remove(item);
      return sendSuccess(res, null, 'Recurso eliminado correctamente', 200);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = { createEntityController };
