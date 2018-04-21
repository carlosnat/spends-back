const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String},
    lastName: { type: String },
    avatar: { type: String },
    birthdate: { type: Date },
    createdAt: { type: Date },
    password: { type: String }
});

module.exports = mongoose.model('User', userSchema);