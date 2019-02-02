const phoneBookController = require('./phoneBook.controller');
const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  console.log(req);
  next();
}, phoneBookController.getAll);

module.exports = {
  basePath: '/phonebook',
  routes,
};
