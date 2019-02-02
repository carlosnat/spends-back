const routes = require('express').Router();
const userController = require('./user.controller');
const userValidationMiddleware = require('./user.middleware');

routes.post('/signup', userValidationMiddleware, userController.signup);
routes.post('/login', userController.login);

module.exports = {
  basePath: '/user',
  routes,
};
