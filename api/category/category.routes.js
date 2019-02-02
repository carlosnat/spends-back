const categoryController = require('./category.controller');
const routes = require('express').Router();

// routes.get('/', categoryController.getAllGroups);
routes.post('/', categoryController.createCategory);
routes.put('/', categoryController.editCategory);
routes.delete('/:id', categoryController.deleteCategory);

module.exports = {
  basePath: '/category',
  routes,
};
