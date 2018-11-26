const userController = require('./user.controller');
const userMiddleware = require('./user.middleware');
const express = require('express');

const routes = express.Router();

routes.post('/signup', userMiddleware, userController.signup);
routes.post('/login', userController.login);

module.exports = {
  basePath: '/user',
  routes
}
