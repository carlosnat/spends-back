const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const familySchema = mongoose.Schema({
  name: { type: String },
  logo: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  spendsGroups: [{ type: Schema.Types.Mixed }],
  categories: [{ type: Schema.Types.Mixed }],
  operations: [{ type: Schema.Types.Mixed }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date },
});

module.exports = mongoose.model('Family', familySchema);
