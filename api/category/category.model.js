const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String },
    icono: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);