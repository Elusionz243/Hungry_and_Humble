const reviews = require('./01_reviews.json');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE reviews RESTART IDENTITY CASCADE")
    .then(() => knex('reviews').insert(reviews));
};
