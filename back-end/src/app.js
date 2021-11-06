const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const knex = require('./db/connection');

const app = express();

const notFound = require('./errors/notFound');

const projectsRouter = require('./projects/projects.router');
const reviewsRouter = require('./reviews/reviews.router');
const usersRouter = require('./users/users.router');
const errorHandler = require("./errors/errorHandler");

app.set('db', knex);
app.use(cors());
app.use(express.json());

app.use("/projects", projectsRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
