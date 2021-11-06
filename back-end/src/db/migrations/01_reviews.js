
exports.up = function (knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('review_id').primary();
    table.string('review_author').notNullable();
    table.string('review_message').notNullable();
    table.double('review_rating', { precision: 2 }).notNullable();
    table.integer('user_id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('reviews');
};
