const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spendGroupSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String },
    color: { type: String }
});

module.exports = mongoose.model('SpendGroup', spendGroupSchema);