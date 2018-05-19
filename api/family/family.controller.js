const Families = require('./family.model');
const Groups = require('../spendGroup/spendGroup.model');
const mongoose = require('mongoose');


exports.getAllFamilies = async (req, res) => {
    try {
        const families = await Families.find({ createdBy: req.params.userId}).lean();
        res.json({families})
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}

exports.createFamily = async (req, res) => {
    try {
        const product = new Families({
            name: req.body.name,
            createdBy: req.body.userId
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

exports.addGroupSpend = async (group) => {
    try {
        const familyUpdated = await Families.findOneAndUpdate(group.belongsTo, { 
            $push: {
                spendsGroups: group
            }
        }, { new: true })
        return familyUpdated
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