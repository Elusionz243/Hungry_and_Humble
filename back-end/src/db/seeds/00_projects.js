const projects = require('./00_projects.json');
console.log(projects);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE projects RESTART IDENTITY CASCADE")
    .then(() => knex('projects').insert(projects));
};
