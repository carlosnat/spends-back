const userController = require('./user.controller');
const userValidationMiddleware = require('./user.middleware');
const routes = require('express').Router();

routes.post('/signup', userValidationMiddleware, userController.signup);
routes.post('/login', userController.login);

module.exports = {
  basePath: '/user',
  routes
}
