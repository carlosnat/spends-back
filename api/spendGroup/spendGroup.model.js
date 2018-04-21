const mongoose = require('mongoose');

const familySchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String },
    color: { type: String }
});

module.exports = mongoose.model('Families', familySchema);