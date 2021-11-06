const service = require('./users.services');

const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const list = async (req, res, next) => {
  const knex = req.app.get('db');

  res.json({ data: await service.listUsers(knex) });
}

const findUserByID = async (req, res, next) => {
  const user = res.locals.user;

  res.status(200).json({ data: user });
}

const createUser = async (req, res, next) => {
  const knex = req.app.get('db');

  const data = await service.createUser(knex, res.locals.user);

  res.status(201).json({ data });
}

const updateUser = async (req, res, next) => {
  const knex = req.app.get('db');

  const data = await service.updateUser(knex, req.body.data);

  res.json({ data });
}


/*
 * HELPER FUNCTIONS
 */


const userExists = async (req, res, next) => {
  const knex = req.app.get('db');
  const user_id = req.params.user_id;
  const foundUser = await service.getUserByID(knex, user_id);

  if (!foundUser) {
    next({
      status: 404,
      message: `User with the ID '${user_id}' does not exists.`
    });
  }

  res.locals.user = foundUser;
  next();
}

const hasProperties = async (req, res, next) => {
  if (!req.body.data) {
    return next({
      status: 400,
      message: "a 'data' field is required"
    })
  }

  const {
    user_name,
    user_first_name,
    user_last_name,
    user_profile_picture,
    user_bio,
    user_gender,
  } = req.body.data;

  const requiredFields = [
    'user_name',
    'user_first_name',
    'user_last_name',
    'user_profile_picture',
    'user_bio',
    'user_gender'
  ];

  const currentFields = new Set(Object.keys(req.body.data));

  const invalidFields = requiredFields.filter((field) => !currentFields.has(field));

  if (invalidFields.length > 0) {
    return next({ status: 400, message: `${invalidFields.join(', ')} is required` });
  }

  if (
    typeof user_profile_picture !== 'string' ||
    typeof user_bio !== 'string' ||
    typeof user_gender !== 'string' ||
    typeof user_last_name !== 'string' ||
    typeof user_first_name !== 'string' ||
    typeof user_name !== 'string'
  ) {
    return next({
      status: 400,
      message: `All fields must be a 'string' type`
    });
  }

  if (user_name.length < 5) {
    return next({ status: 400, message: `user_name needs a length greater than or equal to 5` })
  }

  if (user_first_name.length === 0) {
    return next({ status: 400, message: `user_first_name needs a length greater than or equal to 1` });
  }

  if (user_last_name.length === 0) {
    return next({ status: 400, message: `user_last_name needs a length greater than or equal to 1` });
  }


  res.locals.user = req.body.data;
  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  findUserByID: [
    asyncErrorBoundary(userExists),
    asyncErrorBoundary(findUserByID)
  ],
  createUser: [
    asyncErrorBoundary(hasProperties),
    asyncErrorBoundary(createUser)
  ],
  updateUser: [
    asyncErrorBoundary(hasProperties),
    asyncErrorBoundary(userExists),
    asyncErrorBoundary(updateUser)
  ],
}