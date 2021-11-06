const listProjects = (knex) =>
  knex('projects')
    .select('*');

const findProjectByID = (knex, project_id) =>
  knex('projects')
    .select('*')
    .where({ project_id })
    .first();

const createProject = (knex, project) =>
  knex('projects')
    .insert(project)
    .returning('*')
    .then(result => result[0]);

const updateProject = (knex, project) =>
  knex('projects')
    .update(project)
    .where({ "project_id": project.project_id })
    .returning('*')
    .then(result => result[0]);

module.exports = {
  listProjects,
  findProjectByID,
  createProject,
  updateProject
}