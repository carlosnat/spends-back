const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const randomstring = require('randomstring');

// todo: this must be in env or secret
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

module.exports = parser;