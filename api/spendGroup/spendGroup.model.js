const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spendGroupSchema = mongoose.Schema({
    name: { type: String },
    color: { type: String },
    belongsToFamily: { type: String },
    createdAt: { type: Date }
});

module.exports = mongoose.model('SpendGroup', spendGroupSchema);