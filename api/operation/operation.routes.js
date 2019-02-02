const parser = require('./cloudinary.middleware');
const operationController = require('./operation.controller');
const routes = require('express').Router();

routes.get('/family/:idFamily', operationController.getAll);
routes.post('/', operationController.create);
routes.post('/upload', parser.single('image'), (req, res) => {
  res.json(req.file);
});

module.exports = {
  basePath: '/operation',
  routes,
};
