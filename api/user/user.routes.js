const userController = require('./user.controller');
const userValidationMiddleware = require('./user.middleware');
const express = require('express');

const routes = express.Router();

routes.post('/signup', userValidationMiddleware, userController.signup);
routes.post('/login', userController.login);

module.exports = {
  basePath: '/user',
  routes
}
