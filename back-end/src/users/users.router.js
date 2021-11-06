const router = require('express').Router();

const controller = require('./users.controller');

const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/')
  .get(controller.list)
  .post(controller.createUser)
  .all(methodNotAllowed);

router.route('/:user_id')
  .get(controller.findUserByID)
  .put(controller.updateUser)
  .all(methodNotAllowed);


module.exports = router;