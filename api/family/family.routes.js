'use strict'

var familyModel = require('./family.model');
var routes = require('../routes');

module.exports = function(app){
    routes(app, familyModel, 'family');
}
