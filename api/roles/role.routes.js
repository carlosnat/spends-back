const rolesController = require('./role.controller');
const roleValidationMiddleware = require('./role.middleware');
const routes = require('express').Router();

const stringHash = require('string-hash');


routes.get('/:role_id', (req, res, next) => {
  console.log();
  // console.log(`${req.baseUrl}${req.route.path}`);
  const hash = stringHash(`api-family${req.baseUrl}${req.route.path}${req.method}`);
  console.log(hash);
  next();
}, rolesController.getAll);
routes.post('/', roleValidationMiddleware, rolesController.create);

module.exports = {
  basePath: '/roles',
  routes
}