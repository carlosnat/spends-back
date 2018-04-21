'use strict'

var spendGroupModel = require('./spendGroup.model');
var routes = require('../routes');

module.exports = function(app){
    routes(app, spendGroupModel, 'spendGroup');
}
