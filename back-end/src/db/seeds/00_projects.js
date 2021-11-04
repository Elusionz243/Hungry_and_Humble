
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const projects = require('./00_projects.json');
  
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert(projects);
    });
};
