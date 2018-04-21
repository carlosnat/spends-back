const mongoose = require('mongoose');

const familySchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    family: [{ type: Schema.Types.ObjectId, ref: 'Family' }],
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    amount: { type: Number },
    description: { type: String },
    occurrenceDate: { type: Date },
    creationDate: { type: Date }
});

module.exports = mongoose.model('Families', familySchema);