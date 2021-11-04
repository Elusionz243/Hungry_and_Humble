const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const knex = require('./db/connection');

const app = express();

const notFound = require('./errors/notFound');

const projectsRouter = require('./projects/projects.router');

app.set('db', knex);
app.use(cors());
app.use(express.json());

app.use("/projects", projectsRouter);

app.use(notFound);

module.exports = app;
