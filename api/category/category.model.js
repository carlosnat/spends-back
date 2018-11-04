const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
  name: { type: String },
  icono: { type: String },
  belongsToGroup: { type: String },
  belongsToFamily: { type: String },
  createdAt: { type: Date },
});

module.exports = mongoose.model('Category', categorySchema);
