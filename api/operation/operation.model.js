const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationSchema = mongoose.Schema({
    family: [{ type: Schema.Types.ObjectId, ref: 'Family' }],
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    amount: { type: Number },
    description: { type: String },
    occurrenceDate: { type: Date },
    creationDate: { type: Date },
    image: { type: Schema.Types.Mixed }
});

module.exports = mongoose.model('Operation', operationSchema);