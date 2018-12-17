const spendController = require('./spendGroup.controller');
const routes = require('express').Router();

routes.get('/:familyId', spendController.getAllGroups);
routes.post('/', spendController.createGroup);
routes.put('/', spendController.editGroup);
routes.delete('/:id', spendController.deleteGroup);


module.exports = {
  basePath: '/spendgroup',
  routes
}
