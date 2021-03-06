const apiExplorer = require('./api-explorer');
const userRoutes = require('./user/user.routes');
const categoryRoutes = require('./category/category.routes');
const familyRoutes = require('./family/family.routes');
const operationRoutes = require('./operation/operation.routes');
const spendGroupRoutes = require('./spendGroup/spendGroup.routes');
const phoneBookRoutes = require('./phoneBook/phoneBook.routes');
const rolesRoutes = require('./roles/role.routes');

const routeGroup = {
  userRoutes,
  categoryRoutes,
  familyRoutes,
  operationRoutes,
  spendGroupRoutes,
  phoneBookRoutes,
  rolesRoutes,
};

module.exports = (app) => {
  const serverBasePath = '/api';
  for (const route in routeGroup) {
    const endpoint = `${serverBasePath}${routeGroup[route].basePath}`;
    app.use(endpoint, routeGroup[route].routes);
  }
  apiExplorer(app);
};
