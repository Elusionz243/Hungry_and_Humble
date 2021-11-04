const listProjects = (knex) => {
  knex('projects')
    .select('*');
}

module.exports = {
  listProjects,
}