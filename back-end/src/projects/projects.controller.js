const service = require('./projects.services');

const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const list = async (req, res) => {
  const knex = req.app.get('db');
  const data = await service.listProjects(knex);
  res.json({ data });
}

const findProjectByID = async (req, res) => {
  const project = res.locals.project;

  res.status(200).json({ data: project });
}

const createProject = async (req, res) => {
  const knex = req.app.get('db');

  const data = await service.createProject(knex, res.locals.project);

  res.status(201).json({ data });
}

const updateProject = async (req, res) => {
  const knex = req.app.get('db');

  const data = await service.updateProject(knex, req.body.data);

  res.json({ data });
}

/*
 *  HELPER FUNCTIONS
 */

const projectExists = async (req, res, next) => {
  const knex = req.app.get('db');
  const project_id = req.params.project_id;
  const foundProject = await service.findProjectByID(knex, project_id);

  if (!foundProject) {
    return next({
      status: 404,
      message: `Project with ID {${project_id}} does not exists`
    });
  }

  res.locals.project = foundProject;
  next();
}

const hasProperties = async (req, res, next) => {
  if (!req.body.data) {
    return next({
      status: 400,
      message: "A 'data' field is required"
    });
  }

  const {
    project_title,
    project_url,
    project_category,
    project_description
  } = req.body.data;

  const requiredFields = ['project_title', 'project_url', 'project_category', 'project_description'];

  const currentFields = new Set(Object.keys(req.body.data));

  const invalidFields = requiredFields.filter((field) => !currentFields.has(field));

  if (invalidFields.length > 0) {
    return next({
      status: 400,
      message: `${invalidFields.join(', ')} is required`
    })
  }

  if (
    typeof project_title !== 'string' ||
    typeof project_url !== 'string' ||
    typeof project_category !== 'string' ||
    typeof project_description !== 'string'
  ) {
    return next({
      status: 400,
      message: `All fields must be a 'string' type`
    });
  }

  if (project_title.length === 0) {
    return next({
      status: 400,
      message: `project_title must have a length greater than or equal to 1`
    });
  }

  if (project_url.length === 0) {
    return next({
      status: 400,
      message: `project_url must have a length greater than or equal to 1`
    })
  }

  if (project_category.length === 0) {
    return next({
      status: 400,
      message: `project_category must have a length greater than or equal to 1`
    })
  }

  res.locals.project = req.body.data;
  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  findProjectByID: [
    asyncErrorBoundary(projectExists),
    asyncErrorBoundary(findProjectByID)
  ],
  createProject: [
    asyncErrorBoundary(hasProperties),
    asyncErrorBoundary(createProject)
  ],
  updateProject: [
    asyncErrorBoundary(hasProperties),
    asyncErrorBoundary(projectExists),
    asyncErrorBoundary(updateProject)
  ]
}