const { AppDataSource } = require('../config/dataSource');
const { sendSuccess } = require('../utils/response');

const getLogs = async (req, res) => {
  const { level, limit = 50, page = 1 } = req.query;
  const query = AppDataSource.getRepository('EventLog').createQueryBuilder('log');

  if (level) {
    query.where('log.nivel = :level', { level });
  }

  const [items, total] = await query
    .orderBy('log.fecha', 'DESC')
    .skip((Number(page) - 1) * Number(limit))
    .take(Number(limit))
    .getManyAndCount();

  return sendSuccess(res, { items, total, page: Number(page), limit: Number(limit) }, 'Logs obtenidos', 200);
};

module.exports = { getLogs };
