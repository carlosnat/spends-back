const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = mongoose.Schema({
    name: { type: String },
    logo: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    spendsGroups: [{ type: Schema.Types.Mixed}],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    operations: [{ type: Schema.Types.ObjectId, ref: 'Operation' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Family', familySchema);