

const userModel = require('./user.model');
const routes = require('../routes');
const userController = require('./user.controller');

module.exports = function (app) {
  app.post('/api/user/signup', userController.signup);
  app.post('/api/user/login', userController.login);
  routes(app, userModel, 'user');
};
