const rolesController = require('./role.controller');
const roleValidationMiddleware = require('./role.middleware');
const routes = require('express').Router();

routes.get('/', rolesController.getAll);
routes.post('/', roleValidationMiddleware, rolesController.create);

module.exports = {
  basePath: '/roles',
  routes
}