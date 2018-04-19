const mongoose = require('mongoose');

const familySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    members: [{
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String },
        age: { type: Number },
        rol: { 
            type: String, 
            enum: ['parent', 'child', 'grandparent', 'guess'], 
            default: 'parent'
        }
    }],
    spendgroups: [{
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String }
    }],
    spenscategory: [{
        _id: mongoose.Schema.Types.ObjectId,
        group: { type: String },
        name: { type: String }
    }],
    spends: [{
        group: { type: String },
        category: { type:String },
        createdAt: { type: Date },
        amount: { type: Number },
        observation: { type: String },
        spendDate: { type: String }
    }]
});

module.exports = mongoose.model('Families', familySchema);