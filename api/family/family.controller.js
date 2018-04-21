const Families = require('./group.model');
const mongoose = require('mongoose');


exports.getAllFamilies = async (req, res) => {
    try {
        const families = await Families.find().lean();
        res.json({families})
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}

exports.createFamily = async (req, res) => {
    try {
        const product = new Families({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
        })
        const familySaved = await product.save();
        res.json({familySaved})
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}

exports.addMember = async (req, res) => {
    try {
        const groupFound = await Families.findOneAndUpdate(req.params.idFamily, { 
            $push: {
                members: req.body
            }
        }, { new: true })
        res.json(groupFound)
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}

exports.addGroupSpend = async (req, res) => {
    try {
        const groupFound = await Families.findOneAndUpdate(req.params.idFamily, { 
            $push: {
                spendgroups: req.body
            }
        }, { new: true })
        res.json(groupFound)
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}

exports.addGroupCategory = async (req, res) => {
    try {
        const groupFound = await Families.findOneAndUpdate(req.params.idFamily, { 
            $push: {
                spenscategory: req.body
            }
        }, { new: true })
        res.json(groupFound)
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}

exports.addSpend = async (req, res) => {
    try {
        req.body.createdAt = Date.now();
        const groupFound = await Families.findOneAndUpdate(req.params.idFamily, { 
            $push: {
                spends: req.body
            }
        }, { new: true })
        res.json(groupFound)
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}