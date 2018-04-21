'use strict'

var categoryModel = require('./category.model');
var routes = require('../routes');

module.exports = function(app){
    routes(app, categoryModel, 'category');
}
