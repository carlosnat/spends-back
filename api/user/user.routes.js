'use strict'

const userModel = require('./user.model');
const routes = require('../routes');
const userController = require('./user.controller');

module.exports = function(app){
    app.post('/api/user/signup', userController.signup);
    routes(app, userModel, 'user');
}
