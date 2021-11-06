const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./reviews.services');

const list = async (req, res, next) => {
  const knex = req.app.get('db');

  res.json({ data: await service.listReviews(knex) });
}

const findReviewByID = (req, res) => {
  const data = res.locals.review;

  res.json({ data });
}

const createReview = async (req, res) => {
  const knex = req.app.get('db');

  const review = res.locals.review;

  const data = await service.createReview(knex, review);

  res.status(201).json({ data });
}

const updateReview = async (req, res) => {
  const knex = req.app.get('db');

  const review = req.body.data;

  const data = await service.updateReview(knex, review);

  res.json({ data });
}


/*
 *  HELPER FUNCTIONS
 */

const reviewExists = async (req, res, next) => {
  const knex = req.app.get('db');

  const review_id = req.params.review_id;

  const foundReview = await service.findReviewByID(knex, review_id);

  if (!foundReview) {
    return next({
      status: 404,
      message: `Review with ID {${review_id}} does not exists`
    })
  }

  res.locals.review = foundReview;
  next();
}

const hasProperties = (req, res, next) => {
  if (!req.body.data) {
    return next({
      status: 400,
      message: `A 'data' field is required`
    })
  }

  const {
    review_author,
    review_message,
    review_rating
  } = req.body.data;

  const requiredFields = ['review_author', 'review_message', 'review_rating'];

  const currentFields = new Set(Object.keys(req.body.data));

  const invalidFields = requiredFields.filter((field) => !currentFields.has(field));

  if (invalidFields.length > 0) {
    return next({
      status: 400,
      message: `${invalidFields.join(', ')} are required`
    })
  }

  if (
    typeof review_author !== 'string' ||
    typeof review_message !== 'string' ||
    typeof review_rating !== 'number'
  ) {
    return next({
      status: 400,
      message: `All fields must be a 'string' type`
    })
  }

  if (review_author.length === 0) {
    return next({
      status: 400,
      message: `review_author must have a length greater than or equal to 1`
    })
  }

  if (review_message.length === 0) {
    return next({
      status: 400,
      message: `review_message must have a length greater than or equal to 1`
    })
  }

  res.locals.review = req.body.data;
  next();
}

module.exports = {
  list: [
    asyncErrorBoundary(list)
  ],
  findReviewByID: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(findReviewByID)
  ],
  createReview: [
    asyncErrorBoundary(hasProperties),
    asyncErrorBoundary(createReview)
  ],
  updateReview: [
    asyncErrorBoundary(hasProperties),
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(updateReview)
  ]
}