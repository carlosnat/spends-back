const mongoose = require('mongoose');

const familySchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String },
    icono: { type: String }
});

module.exports = mongoose.model('Category', familySchema);