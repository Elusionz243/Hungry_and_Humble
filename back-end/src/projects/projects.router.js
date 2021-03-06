const router = require('express').Router();

const controller = require('./projects.controller');

const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/')
  .get(controller.list)
  .post(controller.createProject)
  .all(methodNotAllowed);

router.route('/:project_id')
  .get(controller.findProjectByID)
  .put(controller.updateProject)
  .all(methodNotAllowed);

module.exports = router;