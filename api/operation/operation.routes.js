

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const randomstring = require('randomstring');
const operationController = require('./operation.controller');
const routes = require('../routes');
const operationModel = require('./operation.model');

cloudinary.config({
  cloud_name: 'supercars',
  api_key: '163645418898372',
  api_secret: 'YE5xe0x5IGKL7bdUebAHvS74aU8',
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'operations-images',
  allowedFormats: ['jpg', 'png'],
  filename(req, file, cb) {
    console.log('req', req.file);
    cb(undefined, `${Date.now()}-${randomstring.generate()}`);
  },
});

const parser = multer({ storage });

module.exports = function (app) {
  app.post('/api/operation', operationController.create);
  app.get('/api/operation/family/:idFamily', operationController.getAll);
  app.post('/api/operation/upload', parser.single('image'), (req, res) => {
    console.log(req.file);
    res.json(req.file);
  });
  routes(app, operationModel, 'operation');
};
