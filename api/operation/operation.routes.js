'use strict'

var operationModel = require('./operation.model');
var routes = require('../routes');

var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');

cloudinary.config({ 
    cloud_name: 'supercars', 
    api_key: '163645418898372', 
    api_secret: 'YE5xe0x5IGKL7bdUebAHvS74aU8' 
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'folder-name',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(undefined, 'my-file-name');
    }
});

const parser = multer({ storage: storage });

module.exports = function(app){

    app.post('/api/operation/upload', parser.single('image'), function (req, res) {
        res.json(req.file);
    });

    routes(app, operationModel, 'operation');
}
