const express = require('express');

const server = express();

const projectRouter = require('./projects/routes');
const actionRouter = require('./actions/routes');

server.use(express.json());

server.use('/projects', projectRouter);

server.use('/actions', actionRouter);

server.listen(9000);
