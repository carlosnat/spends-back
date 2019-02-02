const rolesController = require('./role.controller');
const roleValidationMiddleware = require('./role.middleware');
const routes = require('express').Router();
const Role = require('./role.schema');
const pathToRegexp = require('path-to-regexp');

routes.get('/:role_id', async (req, res, next) => {
  const role = await Role.findById(req.params.role_id);
  const serviceName = 'api-family';

  for (const service of role.services) {
    if (service.service === serviceName) {
      console.log('Tiene acceso al servicio');
      const re = pathToRegexp(service.path);
      if (re.exec(req.originalUrl)) {
        console.log('Tiene acceso al endpoint');
      } else {
        console.log('No tiene acceso al endpoint');
      }
    } else {
      console.log('No tiene acceso al servicio');
    }
    const methodAccess = service.method.find(item => item === '*');
    if (!methodAccess) {
      const findMethodAccess = service.method.find(item => item === req.method);
      if (findMethodAccess) {
        console.log('Tiene acceso al metodo', findMethodAccess);
      } else {
        console.log('No tiene acceso al metodo', req.method);
      }
    } else {
      console.log('Tiene acceso a todo', methodAccess);
    }
  }

  next();
}, rolesController.getAll);

routes.post('/', roleValidationMiddleware, rolesController.create);

module.exports = {
  basePath: '/roles',
  routes,
};
