
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary();
    table.string('user_name').notNullable();
    table.string('user_first_name').notNullable();
    table.string('user_last_name').notNullable();
    table.string('user_profile_picture');
    table.string('user_bio');
    table.string('user_gender').defaultTo('Prefer not to say');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
