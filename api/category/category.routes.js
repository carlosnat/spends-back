'use strict'

var categoryModel = require('./category.model');
const categoryController = require('./category.controller');
var routes = require('../routes');

module.exports = function(app){
    // app.get('/api/category/:familyId', categoryController.getAllGroups);
    app.post('/api/category', categoryController.createCategory);
    app.put('/api/category', categoryController.editCategory);
    app.delete('/api/category', categoryController.deleteCategory);
    routes(app, categoryModel, 'category');
}
