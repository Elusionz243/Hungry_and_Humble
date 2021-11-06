const users = require('./02_users.json');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(() => knex('users').insert(users));
};
