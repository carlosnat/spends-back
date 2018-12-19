const mongoose = require('mongoose');

const phoneBookSchema = mongoose.Schema({
  service: { type: String },
  path: { type: String },
  method: { type: String },
  hash: { type: String }
});

phoneBookSchema.index({path:1, method:1, hash:1}, {unique: true});

module.exports = mongoose.model('PhoneBook', phoneBookSchema);