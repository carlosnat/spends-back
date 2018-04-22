const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    logo: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    spendsGroups: [{ type: Schema.Types.ObjectId, ref: 'SpendGroup' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    operations: [{ type: Schema.Types.ObjectId, ref: 'Operation' }]
});

module.exports = mongoose.model('Family', familySchema);