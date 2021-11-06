const listUsers = (knex) =>
  knex('users')
    .select('*');

const getUserByID = (knex, user_id) =>
  knex('users')
    .select('*')
    .where({ user_id })
    .first();

const createUser = (knex, user) =>
  knex('users')
    .insert(user)
    .returning('*')
    .then(result => result[0]);

const updateUser = (knex, user) =>
  knex('users')
    .update(user)
    .where({ "user_id": user.user_id })
    .returning('*')
    .then(result => result[0]);

module.exports = {
  listUsers,
  getUserByID,
  createUser,
  updateUser,
}