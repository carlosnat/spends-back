const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spendGroupSchema = mongoose.Schema({
    name: { type: String },
    color: { type: String },
    belongsToFamily: { type: String }
});

module.exports = mongoose.model('SpendGroup', spendGroupSchema);