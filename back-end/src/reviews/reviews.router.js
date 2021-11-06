const router = require('express').Router();

const controller = require('./reviews.controller');

const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/')
  .get(controller.list)
  .post(controller.createReview)
  .all(methodNotAllowed);

router.route('/:review_id')
  .get(controller.findReviewByID)
  .put(controller.updateReview)
  .all(methodNotAllowed);

module.exports = router;