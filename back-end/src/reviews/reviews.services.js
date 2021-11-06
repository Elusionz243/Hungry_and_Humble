const listReviews = (knex) =>
  knex('reviews')
    .select('*');

const findReviewByID = (knex, review_id) =>
  knex('reviews')
    .select('*')
    .where({ review_id })
    .first();

const createReview = (knex, review) =>
  knex('reviews')
    .insert(review)
    .returning('*')
    .then(result => result[0]);

const updateReview = (knex, review) =>
  knex('reviews')
    .update(review)
    .where({ "review_id": review.review_id })
    .returning('*')
    .then(result => result[0]);

module.exports = {
  listReviews,
  findReviewByID,
  createReview,
  updateReview
}