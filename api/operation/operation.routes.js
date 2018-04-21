'use strict'

var operationModel = require('./operation.model');
var routes = require('../routes');

module.exports = function(app){
    routes(app, operationModel, 'operation');
}
