const Group = require('./spendGroup.model');
const mongoose = require('mongoose');
const familyController = require('../family/family.controller');
const Family = require('../family/family.model');

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find({ belongsToFamily: req.params.familyId}).lean();
        res.json({groups})
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}

exports.createGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        const groupCreated = await group.save();
        const result = await familyController.addGroupSpend(groupCreated)
        res.json({result})
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }    
}

exports.editGroup = async (req, res) => {
    try {
        const groupUpdated = await Group.findByIdAndUpdate(req.body._id, req.body);
        const familyToUpdate = await Family.findById(req.body.belongsToFamily).lean();
        familyToUpdate.spendsGroups.forEach(element => {
           if(element._id.toString() === req.body._id){
               element.name = req.body.name;
               element.color = req.body.color;
           } 
        });
        const familyUpdated = await Family.findByIdAndUpdate(familyToUpdate._id, familyToUpdate, { new: true });
        res.json({familyUpdated})
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });         
    }
}

exports.deleteGroup = async (req, res) => {
    try {
        const groupToDelete = await Group.findById(req.query._id).lean();
        const familyToUpdate = await Family.findById(groupToDelete.belongsToFamily).lean();
        familyToUpdate.spendsGroups = familyToUpdate.spendsGroups.filter( element => element._id.toString() !== req.query._id);
        const familyUpdated = await Family.findByIdAndUpdate(familyToUpdate._id, familyToUpdate, { new: true });
        const modelDeleted = await Group.remove({_id:req.query._id});
        res.json(familyUpdated);
    } catch (err) {
        res.status(502).json({err})
    }
}