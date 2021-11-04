const service = require('./projects.services');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const list = async (req, res) => {
  const knex = req.app.get('db');
  res.json({ data: await service.listProjects(knex) });
}

module.exports = {
  list: [asyncErrorBoundary, list],
}