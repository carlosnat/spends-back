const mongoose = require('mongoose');

const phoneBookSchema = mongoose.Schema({
  path: { type: String },
  method: { type: String },
});

phoneBookSchema.index({path:1, method:1}, {unique: true});

module.exports = mongoose.model('PhoneBook', phoneBookSchema);