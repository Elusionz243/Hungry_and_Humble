exports.up = function (knex) {
  return knex.schema.createTable("projects", (table) => {
    table.increments("project_id").primary();
    table.string("project_title").notNullable();
    table.string("project_url").notNullable();
    table.string("project_category").notNullable();
    table.string("project_description").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
