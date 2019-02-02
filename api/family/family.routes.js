const familyController = require('./family.controller');
const routes = require('express').Router();

routes.post('/', familyController.createFamily);
routes.post('/spendgroup/:idFamily', familyController.addGroupSpend);
routes.get('/user/:userId', familyController.getAllFamilies);
routes.get('/:familyId', familyController.getById);

module.exports = {
  basePath: '/family',
  routes,
};
