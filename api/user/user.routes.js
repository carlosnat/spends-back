'use strict'

var userModel = require('./user.model');
var routes = require('../routes');

module.exports = function(app){
    routes(app, userModel, 'user');
}
