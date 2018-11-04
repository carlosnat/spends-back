const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  birthdate: { type: String },
  createdAt: { type: Date },
  password: { type: String },
});

module.exports = mongoose.model('User', userSchema);
