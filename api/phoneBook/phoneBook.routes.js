const phoneBookController = require('./phoneBook.controller');
const routes = require('express').Router();

routes.get('/', phoneBookController.getAll);

module.exports = {
  basePath: '/phonebook',
  routes
}